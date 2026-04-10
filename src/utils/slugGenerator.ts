import prismaClient from "../config/prismaClient";

export const slugGenerator = async (name: string): Promise<string> => {
  const baseSlug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const existingCategories = await prismaClient.category.findMany({
    where: {
      slug: {
        startsWith: baseSlug,
      },
    },
    select: { slug: true },
  });

  if (existingCategories.length === 0) {
    return baseSlug;
  }

  let maxNumber = 0;
  for (const cat of existingCategories) {
    const suffix = cat.slug.slice(baseSlug.length).replace(/^-/, "");
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