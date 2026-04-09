-- AlterTable
ALTER TABLE "admin_profiles" ADD COLUMN     "backgroundImage" TEXT,
ADD COLUMN     "contactNumber1" TEXT,
ADD COLUMN     "contactNumber2" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "profileImage" TEXT;

-- AlterTable
ALTER TABLE "instructor_profiles" ADD COLUMN     "dateOfBirth" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "student_profiles" ADD COLUMN     "backgroundImage" TEXT,
ADD COLUMN     "contactNumber1" TEXT,
ADD COLUMN     "contactNumber2" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "profileImage" TEXT;
