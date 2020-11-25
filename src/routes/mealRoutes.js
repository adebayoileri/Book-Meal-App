import mealController from "../controllers/meal.controller";
import { checkCaterer, checkToken } from "../middleware";

import { Router } from "express";
const router = Router();

router.get("/meals", mealController.getAllMeals);

router.get("/meals/:id", mealController.getOneMeal);
router.get("/restaurants", mealController.getAllRestaurant);
router.get("/restaurants/:restaurantId", mealController.getARestaurant);

router.get("/meals/r/:catererId", mealController.getRestaurantMenu);

router.post("/meals", checkToken, checkCaterer, mealController.createMeal);

router.put("/meals/:id", checkToken, checkCaterer, mealController.updateMeal);

router.delete(
  "/meals/:id",
  checkToken,
  checkCaterer,
  mealController.deleteMeal
);

export default router;
