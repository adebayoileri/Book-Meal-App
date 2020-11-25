import { Router } from "express";
import { checkToken } from "../middleware";
import userController from "../controllers/user.controller";

const router = Router();

router.get("/userprofile", checkToken, userController.getProfile);

router.put("/userprofile", checkToken, userController.editProfile);

router.delete("/userprofile", checkToken, userController.deleteProfile);

export default router;
