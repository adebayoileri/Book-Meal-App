import jwt, { decode } from "jsonwebtoken";

/**
 * @function checkToken
 * @description Check and verify token with jwt
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

const checkToken = (req, res, next) => {
  try {
    const header = req.headers["authorization"];

    if (header !== undefined || null) {
      const token = header.split(" ")[1] || req.token || req.body.token;
      const decodedData = jwt.verify(token, process.env.AUTH_KEY);
      req.user = decodedData;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        status: "failed",
        code: 401,
        message: "unauthorized access",
      });
    }
  } catch (error) {
    return res.status(401).json({
      status: "failed",
      code: 401,
      message: "unauthorized access",
    });
  }
};

export default checkToken;
