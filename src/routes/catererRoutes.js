import {Router} from "express";
import catererController from "../controllers/caterer.controller";
import { checkToken, checkCaterer } from "../middleware";
const router = Router();

router.get('/caterer/orders', checkToken, checkCaterer, catererController.getAllOrders);
router.post('/caterer/restaraunts/create', checkToken, checkCaterer, catererController.createRestaraunt);

export default router;