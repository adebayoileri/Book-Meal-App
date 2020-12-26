import {Router} from "express";
import catererController from "../controllers/caterer.controller";
import { checkToken, checkCaterer } from "../middleware";
const router = Router();

router.get('/caterer/orders', checkToken, checkCaterer, catererController.getAllOrders); //rewrite logic
router.post('/caterer/restaraunts/create', checkToken, checkCaterer, catererController.createRestaraunt); // not done

export default router;