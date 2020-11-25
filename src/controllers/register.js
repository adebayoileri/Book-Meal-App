// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import pool from '../models/db';
// import jsonResponse from '../helpers/jsonResponse';

// class register {
//   static async signUp (req, res) {
//     try{
//       const { firstName, lastName, category, email, password } = req.body;

//       // check if user exists
//       const checkUser = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
      
//       if(checkUser.rows[0]) {
//         return jsonResponse.error(res, 'error', 401, 'user already exist')
//       }

//       const hashPassword = bcrypt.hash(password, 10)

//       const signUp = `INSERT INTO users (first_name, last_name, category, email, password)
//       VALUES ($1, $2, $3, $4, $5) RETURNING *`
//       const values = [firstName, lastName, category, email, hashPassword]
//       const signUpQuery = await pool.query(signUp, values);

//      jwt.sign({ email, password }, process.env.ADMIN_SECRET_KEY, { expiresIn: '72h' }, async (err, token) => {
//        const data = {
//            message: 'admin account successfully created',
//            token
//        }
//         return jsonResponse.success(res, 'success', 201, data)
//      })
//     }
//     catch(e){
//       console.log(e)
//     }
      
//   }
// }

// export default register;