import prismaClient from "../config/prismaClient";

export const generateUsername = async (
  firstName?: string,
  middleName?: string,
  lastName?: string,
): Promise<string> => {
  const parts = [firstName, middleName, lastName].filter(Boolean);
  const baseName = parts.join("").toLowerCase().replace(/\s+/g, "");

 
  const baseUser = await prismaClient.user.findUnique({
    where: { username: baseName },
    select: { id: true },
  });

  if (!baseUser) {
    return baseName;
  }

  let counter = 1;
  while (true) {
    const checkUsername = `${baseName}${counter}`;

    const existingUser = await prismaClient.user.findUnique({
      where: { username: checkUsername },
      select: { id: true },
    });

    if (!existingUser) {
      return checkUsername;
    }

    counter++;
  }
};
