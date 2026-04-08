import prismaClient from "../config/prismaClient";

export const generateUsername = async (
  firstName?: string,
  middleName?: string,
  lastName?: string,
): Promise<string> => {
  const parts = [firstName, middleName, lastName].filter(Boolean);
  const baseName = parts.join("").toLowerCase().replace(/\s+/g, "");

   

  const existingUsers = await prismaClient.user.findMany({
    where: {
      username: {
        startsWith: baseName,
      },
    },
    select: { username: true },
  });

  if (existingUsers.length === 0) {
    return baseName;
  }

  let maxNumber = 0;

  for (const user of existingUsers) {
    const username = user.username;

    // Remove baseName prefix
    const suffix = username.slice(baseName.length); // john10 -> "10", john -> ""

    if (suffix === "") {
      // exact match: "john"
      maxNumber = Math.max(maxNumber, 0);
      continue;
    }

    // Check if suffix is a valid number
    const num = parseInt(suffix, 10);
    if (!isNaN(num)) {
      maxNumber = Math.max(maxNumber, num);
    }
    // else ignore usernames like "johnX" or "john_abc"
  }

  return `${baseName}${maxNumber + 1}`;
};
