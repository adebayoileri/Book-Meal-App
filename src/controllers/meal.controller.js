import pool from "../models/db";

/**
 * @class mealController
 * @description Handles all crud operations for managing meals table
 */

class mealController {
  /**
   * @description creates meal in database
   *
   * @param {object} req request gotten from client
   * @param {object} res response sent to client
   *
   * @returns {object} created meal object
   */
  static async createMeal(req, res) {
    const { name, description, imageUrl, quantity, price, caterer_id } = req.body;
    const { id } = req.user;
    if (!name || !description || !imageUrl || !quantity || !price) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "all fields are required",
      });
    }

    try {
      const createMealQuery = `INSERT INTO meals(name, description, imageUrl, quantity, price, caterer_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
      const values = [name, description, imageUrl, quantity, Number(price), caterer_id];
      const newMeal = await pool.query(createMealQuery, values);
      console.log("create");
      return res.status(201).json({
        status: "success",
        code: 201,
        data: newMeal.rows[0],
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description get all meals in database
   *
   * @param {object} req request gotten from client
   * @param {object} res response sent to client
   *
   * @returns {object} all meals availbale in the database
   */

  static async getAllMeals(_, res) {
    try {
      const getAllMealsQuery = `SELECT * FROM meals ORDER BY createdat DESC`;
      const allMeals = await pool.query(getAllMealsQuery);

      return res.status(200).json({
        status: "success",
        code: 200,
        message: "got all meals successfully",
        data: allMeals.rows,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description get a particular meal from database
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} returns an object with meal gotten from db
   */

  static async getOneMeal(req, res) {
    const { id } = req.params;

    try {
      const getOneMealQuery = `SELECT * FROM meals WHERE id=$1`;
      const value = [id];
      const oneMeal = await pool.query(getOneMealQuery, value);
      if (!oneMeal.rows[0]) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "no meal exists with such id",
        });
      }
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "get one meal succesfully",
        data: oneMeal.rows[0],
      });
    } catch (error) {
      // console.log(error);
    }
  }

  /**
   * @description get all restaurants
   * @param {*} req
   * @param {*} res
   *
   * @returns all available restaraunts
   */

  static async getAllRestaurant(req, res) {
    const start = req.query.start || 0;
    const count = req.query.count || 21;
    try {
      const getAllRestQuery = `SELECT * FROM restaraunts OFFSET($1) LIMIT($2)`;
      const values = [start, count];
      const allRest = await pool.query(getAllRestQuery, values);

      if (!allRest.rows) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "no restaurants",
        });
      }
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "got all restaurant successfully",
        data: allRest.rows,
      });
    } catch (error) {
      console.log(error);
    }
  }
    /**
   * @description get a particular restaurant
   * @param {*} req
   * @param {*} res
   *
   * @returns a restaraunt
   */

  static async getARestaurant(req, res) {
    const id = req.params.restaurantId
    try {
      const getRest = `SELECT * FROM restaraunts WHERE vendor_id=$1`;
      const values = [id];
      const oneRest = await pool.query(getRest, values);

      if (!oneRest.rows[0]) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "no restaurant with that id",
        });
      }
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "got all restaurant successfully",
        data: oneRest.rows[0],
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description get a particular menu for restaurant from database
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} returns an array with meal gotten from db
   */

  static async getRestaurantMenu(req, res) {
    const { catererId } = req.params;

    try {
      const getOneMealQuery = `SELECT * FROM meals WHERE caterer_id=$1`;
      const value = [catererId];
      const rMenu = await pool.query(getOneMealQuery, value);
      if (!rMenu.rows[0]) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "no meals in this restaurant",
        });
      }
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "get menu succesfully",
        data: rMenu.rows,
      });
    } catch (error) {
      // console.log(error);
    }
  }

  /**
   * @description Update existing meal in the database
   * @param {object} req request object gotten from client
   * @param {object} res response  object sent to client
   *
   * @returns {object} returns updated meal object
   */

  static async updateMeal(req, res) {
    const { id } = req.params;
    const { name, description, imageUrl, quantity, price } = req.body;

    const caterer_id = req.user.id;

    try {
      const checkMealIdQuery = `SELECT * FROM meals WHERE id=$1`;
      const value = [id];
      const checkedMeal = await pool.query(checkMealIdQuery, value);
      const mealToUpdate = checkedMeal.rows[0];
      if (!mealToUpdate) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "meal doesn't exists",
        });
      }
      if (mealToUpdate.rows[0].caterer_id !== caterer_id) {
        return res.status(401).json({
          status: "failed",
          code: 401,
          message: "unauthorized access",
        });
      }
      const newMealName = name || mealToUpdate.name;
      const newMealDescription = description || mealToUpdate.description;
      const newMealImageUrl = imageUrl || mealToUpdate.imageUrl;
      const newMealQuantity = quantity || mealToUpdate.quantity;
      const newMealPrice = price || mealToUpdate.price;

      const updateMealQuery = `UPDATE meals SET name=$1, description=$2, imageUrl=$3, quantity=$4, price=$5, updatedat=CURRENT_TIMESTAMP WHERE id=$6 RETURNING *`;
      const values = [
        newMealName,
        newMealDescription,
        newMealImageUrl,
        newMealQuantity,
        newMealPrice,
        id,
      ];

      const updateMeal = await pool.query(updateMealQuery, values);
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "meal updated sucessfully",
        data: updateMeal.rows[0],
      });
    } catch (error) {
      // console.log(error);
    }
  }

  /**
   *
   * @param {object} req  -request parameter -id of meal to be deleted
   * @param {object} res - response message
   */
  static async deleteMeal(req, res) {
    const { id } = req.params;

    try {
      const getOneMealQuery = `SELECT * FROM meals WHERE id=$1`;
      const idValue = [id];
      const checkedMeal = await pool.query(getOneMealQuery, idValue);
      if (!checkedMeal.rows[0]) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "meal doesn't exists in db",
        });
      }

      const deleteTaskQuery = `DELETE FROM meals WHERE id = $1`;
      const value = [id];
      await pool.query(deleteTaskQuery, value);
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "deleted meal successfully",
      });
    } catch (error) {
      // console.log(error);
    }
  }
}

export default mealController;
