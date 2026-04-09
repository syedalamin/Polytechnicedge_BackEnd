import prismaClient from "../config/prismaClient";

export const slugGeneratorUser = async (
  firstName?: string,
  middleName?: string,
  lastName?: string,
): Promise<string> => {
  const parts = [firstName, middleName, lastName].filter(Boolean);
  const baseSlug = parts.join("-").toLowerCase().replace(/\s+/g, "");

  const existingUsers = await prismaClient.user.findMany({
    where: {
      slug: {
        startsWith: baseSlug,
      },
    },
    select: { slug: true },
  });

  if (existingUsers.length === 0) {
    return baseSlug;
  }

  let maxNumber = 0;

  for (const user of existingUsers) {
    const slug = user.slug;

    const suffix = slug.slice(baseSlug.length).replace(/^-/, "");

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
