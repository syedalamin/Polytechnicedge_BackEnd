import bcrypt from "bcrypt";
import prismaClient from "./config/prismaClient";
import { UserRole } from "./generated/prisma/enums";

async function seed() {
  const superAdminEmail = "superadmin@polytechnicedge.com";
  const superAdminUsername = "superadmin";
  const superAdminPassword = "SuperAdmin@123";

  const existingSuperAdmin = await prismaClient.user.findUnique({
    where: { email: superAdminEmail },
  });

  if (existingSuperAdmin) {
    console.log("SuperAdmin already exists, skipping creation.");
    return;
  }

  const hashedPassword = await bcrypt.hash(superAdminPassword, 12);

  const slug = "superadmin";

  await prismaClient.user.create({
    data: {
      email: superAdminEmail,
      username: superAdminUsername,
      slug,
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
      needPasswordChange: false,
      emailVerified: true,
      adminProfile: {
        create: {
          slug,
          username: superAdminUsername,
          firstName: "Super",
          lastName: "Admin",
        },
      },
    },
  });

  console.log("SuperAdmin created successfully!");
}

export default seed;