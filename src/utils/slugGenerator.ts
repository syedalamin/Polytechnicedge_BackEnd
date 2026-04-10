import prismaClient from "../config/prismaClient";

type PrismaModel = keyof typeof prismaClient;

interface SlugGeneratorOptions {
  model: PrismaModel;
  field?: string;
}

const slugGenerator = async (
  name: string,
  options: SlugGeneratorOptions,
): Promise<string> => {
  const { model, field = "slug" } = options;
  const baseSlug = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const modelAny = prismaClient[model] as any;

  const existingRecords = await modelAny.findMany({
    where: {
      [field]: {
        startsWith: baseSlug,
      },
    },
    select: { [field]: true },
  });

  if (existingRecords.length === 0) {
    return baseSlug;
  }

  let maxNumber = 0;
  for (const record of existingRecords) {
    const slugValue = record[field] as string;
    const suffix = slugValue.slice(baseSlug.length).replace(/^-/, "");
    if (suffix === "") {
      maxNumber = Math.max(maxNumber, 0);
      continue;
    }
    const num = parseInt(suffix, 10);
    if (!isNaN(num)) {
      maxNumber = Math.max(maxNumber, num);
    }
  }

  return `${baseSlug}-${maxNumber + 1}`;
};

export const generateUniqueSlug = slugGenerator;
