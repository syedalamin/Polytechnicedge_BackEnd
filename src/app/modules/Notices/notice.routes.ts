import { Router } from "express";
import { noticeController } from "./notice.controller";
import { noticeValidation } from "./notice.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.INSTRUCTOR), validateRequest(noticeValidation.createNoticeValidation), noticeController.createNotice);
router.get("/", noticeController.getAllNotices);
router.get("/global", noticeController.getGlobalNotices);
router.get("/course/:courseId", noticeController.getNoticesByCourseId);
router.get("/:id", noticeController.getNoticeById);
router.patch("/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.INSTRUCTOR), validateRequest(noticeValidation.updateNoticeValidation), noticeController.updateNotice);
router.delete("/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), noticeController.deleteNotice);

export const noticeRoutes = router;