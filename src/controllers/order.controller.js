import pool from "../models/db";

/**
 * @class orderController
 * @description Handles all operations for meal ordering
 */
class orderController {
  /**
   * @description Caterer can get all orders
   *
   * @param {object} req request payload
   * @param {object} res response object sent to client
   */

  static async getAllOrders(req, res) {
    const start = req.query.start || 0;
    const count = req.query.count || 20;
    try {
      const { id } = req.user;
      const userOrdersQuery = `SELECT * FROM orders WHERE user_id=$1 ORDER BY createdat DESC OFFSET($2) LIMIT($3)`;
      const value = [id, start, count];
      const userOrders = await pool.query(userOrdersQuery, value);
      if (userOrders) {
        return res.status(200).json({
          status: "success",
          message: "got all orders",
          code: 200,
          data: userOrders.rows,
        });
      }
    } catch (error) {}
  }

  /**
   *
   * @param {object} req - request object gotten from client
   * @param {object} res - response object sent to client
   */
  static async getAllOrderItems(req, res) {
    const { id } = req.params;
    try {
      const getAllOrderItemsQuery = `SELECT * FROM orderitem WHERE order_id=$1`;
      const value = [id];
      const allOrderItems = await pool.query(getAllOrderItemsQuery, value);

      return res.status(200).json({
        status: "success",
        code: 200,
        message: "all order items gotten",
        data: allOrderItems.rows,
      });
    } catch (error) {}
  }

  /**
   *
   * @param {object} req - request object gotten from client
   * @param {object} res - response object sent to client
   */
  static async removeItemFromOrder(req, res) {
    try {
      const { id } = req.params;
      const getOrderItemQuery = `SELECT * FROM orderitem WHERE id=$1`;
      const value = [id];
      const orderItem = await pool.query(getOrderItemQuery, value);
      if (!orderItem.rows[0]) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "item doesn't exist in order",
        });
      }
      const removeItemFromOrderQuery = `DELETE FROM orderitem WHERE id=$1`;
      const deletevalue = [id];
      await pool.query(removeItemFromOrderQuery, deletevalue);
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "removed iitem from order successfully",
      });
    } catch (error) {}
  }

  /**
   *
   * @param {object} req - request object gotten from client
   * @param {object} res - response object sent to client
   */
  static async getAnOrder(req, res) {
    const orderId = req.params.id;
    const { id } = req.user;
    try {
      const findOrderQuery = `SELECT * FROM orders WHERE id=$1 LIMIT 1`;
      const value = [orderId];
      const orderFound = await pool.query(findOrderQuery, value);
      if (orderFound.rows[0] && orderFound.rows[0].user_id === id) {
        return res.status(200).json({
          status: "success",
          code: 200,
          message: "got an order successfully",
          data: orderFound.rows[0],
        });
      }
    } catch (error) {}
  }

  /**
   * @description Make an order from existing meals
   *
   * @param {object} req request payload
   * @param {object} res response object sent to client
   */

  static async makeOrder(req, res) {
    try {
      const { id } = req.user;
      const { meals, deliveryAddress } = req.body; //address paymentstatus
      const mealData = JSON.parse(JSON.stringify(meals));
      if (mealData && mealData.length === 0) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "no meals ",
        });
      }
      if (!deliveryAddress) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "provide a delivery address",
        });
      }
      const CreateOrderQuery = `INSERT INTO orders(user_id, deliveryAddress) VALUES($1, $2) RETURNING *`;
      const value = [id, deliveryAddress];
      const newOrder = await pool.query(CreateOrderQuery, value);
      const order_id = newOrder.rows[0].id;
      if (!order_id) {
        return res.status(400).json({
          status: "error",
          message: "error occured creating an order",
        });
      }
      let allOrders = [];
      const ordersData =
        mealData &
        mealData.map(async ({ quantity, id, caterer_id, price }) => {
          const CreateOrderItemQuery = `INSERT INTO orderitem (order_id, meal_id, caterer_id, quantity, price) VALUES($1, $2, $3, $4, $5) RETURNING *`;
          const values = [order_id, id, caterer_id, quantity, price];
          const newOrderItem = await pool.query(CreateOrderItemQuery, values);
          // console.log("new",newOrderItem.rows[0]);
          allOrders.push(newOrderItem.rows[0]);
          console.log("all Ordes", allOrders);
          return allOrders;
          // console.log(allOrders)
        });
      console.log("oreder data", ordersData);
      return res.status(200).json({
        status: "success",
        message: "new order created",
        orderId: order_id,
      });
    } catch (error) {
      console.log(error);
      // return res.status(400).json({
      //   status: "failed",
      //   code: 401,
      //   message: error,
      // });
    }
  }

  /**
   * @static deleteOrder
   * @description handles all deleting/removing items from an order
   *
   * @param {object} req request payload
   * @param {object} res response object sent to client
   */

  static async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      const getOrderQuery = `SELECT * FROM orders WHERE id=$1`;
      const value = [id];
      const order = await pool.query(getOrderQuery, value);
      if (!order.rows[0]) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "order doesn't exist",
        });
      }
      const deleteOrderQuery = `DELETE FROM orderitem WHERE id=$1`;
      const deletevalue = [id];
      await pool.query(deleteOrderQuery, deletevalue);
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "removed iitem from order successfully",
      });
    } catch (error) {}
  }

  /**
   *
   * @param {object} req request payload
   * @param {object} res response object sent to client
   */

  static async cancelOrder(req, res) {
    const orderId = req.params.id;
    const { id } = req.user;
    try {
      const findOrderQuery = `SELECT * FROM orders WHERE id=$1`;
      const value = [orderId];
      const orderFound = await pool.query(findOrderQuery, value);
      if (orderFound.rows[0] && orderFound.rows[0].user_id === id) {
        const cancelOrderQuery = `UPDATE orders SET status='canceled', updatedat=CURRENT_TIMESTAMP WHERE id=$1 RETURNING *`;
        const value = [orderId];
        const canceledOrder = await pool.query(cancelOrderQuery, value);
        return canceledOrder.rows[0].status &&
          canceledOrder.rows[0].status === "canceled"
          ? res.status(200).json({
              status: "success",
              message: "order canceled successfully",
              code: 200,
            })
          : res.status(400).json({
              status: "failed",
              message: "order couldn't be canceled",
              code: 400,
            });
      }
    } catch (error) {}
  }
}

export default orderController;
