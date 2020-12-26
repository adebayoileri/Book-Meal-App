import mealController from "../controllers/meal.controller";
import { checkCaterer, checkToken } from "../middleware";

import { Router } from "express";
const router = Router();

router.get("/meals", mealController.getAllMeals); //done

router.get("/meals/:id", mealController.getOneMeal);// done
router.get("/restaurants", mealController.getAllRestaurant); //done
router.get("/restaurants/:restaurantId", mealController.getARestaurant);//done

router.get("/meals/r/:catererId", mealController.getRestaurantMenu);//done

router.post("/meals", checkToken, checkCaterer, mealController.createMeal);

router.put("/meals/:id", checkToken, checkCaterer, mealController.updateMeal);

router.delete(
  "/meals/:id",
  checkToken,
  checkCaterer,
  mealController.deleteMeal
);

export default router;
