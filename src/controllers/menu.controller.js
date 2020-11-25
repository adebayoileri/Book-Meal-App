import pool from "../models/db";

/**
 * @class menuController
 * @description menuController - handles all menu operations with db
 */

class menuController {
  /**
   * @description Add meal to menu
   * @param {object} req  request object gotten from client meal_id to add to body
   * @param {object} res response object sent to client - addedMeal
   */
  static async addMealToMenu(req, res) {
    const { meal_id } = req.body;
    try {
      const checkIfMealExistsQuery = `SELECT * FROM meals WHERE id=$1`;
      const mealIdValue = [meal_id];
      const checkIfMealExistsData = await pool.query(
        checkIfMealExistsQuery,
        mealIdValue
      );
      if (!checkIfMealExistsData.rows[0]) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "meal doesn't exists",
        });
      }
      if (checkIfMealExistsData.rows[0]) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "meal is already on menu",
        });
      }
      const addMealQuery = `INSERT INTO meals(meal_id) VALUES($1)`;
      const value = [meal_id];
      const addedMeal = await pool.query(addMealQuery, value);

      res.status(201).json({
        status: "success",
        code: 201,
        message: "menu created",
        data: addedMeal.rows[0],
      });
    } catch (error) {
      // console.log(error)
    }
  }
  /**
   * @description get meal from menu
   * @param {object} req  request object from menu
   * @param {object} res  response object to client
   *
   * @returns {object} returns menu object
   */

  static async getMenu(_req, res) {
    try {
      const getMenuQuery = `SELECT * FROM menu ORDER BY addedon DESC`;
      const getMenuData = await pool.query(getMenuQuery);
      return res.status(200).json({
        status: "success",
        code: 200,
        data: getMenuData.rows[0],
      });
    } catch (error) {
      // console.log(error)
    }
  }

  /**
   * @description Remove meal from menu
   * @param {object} req  request paramaters gotten  from client -meal_id
   * @param {object} res response object sent to client
   */

  static async removeMealFromMenu(req, res) {
    const { id } = req.params;
    try {
      const checkIfMealExistsQuery = `SELECT * FROM meals WHERE meal_id=$1`;
      const mealIdValue = [meal_id];
      const checkIfMealExistsData = await pool.query(
        checkIfMealExistsQuery,
        mealIdValue
      );
      if (!checkIfMealExistsData.rows[0]) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "meal doesn't exists",
        });
      }

      const deleteMealQuery = `DELETE FROM meals WHERE id=$1`;
      const value = [id];
      await pool.query(deleteMealQuery, value);
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "deleted meal successfully",
      });
    } catch (error) {
      // console.log(error)
    }
  }
}

export default menuController;
