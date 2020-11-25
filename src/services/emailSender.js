import sendGrid from "@sendgrid/mail";
import pool from "../models/db";


/**
 * @class emailSender
 * @description controls all mailing logic in app
 */

class emailSender{
    /**
     * @description send email notification
     * 
     * @param {string} userEmail 
     * @param {string} mailSubject 
     * @param {string} mailBody 
     */
    static async sendEmail(userEmail, mailSubject, mailBody){
        message = {
            from: `Meal Booking App <${process.env.SENDGRID_EMAIL}>`,
            to: userEmail,
            subject: mailSubject,
            html: `<div style="background: white; color: black;"><h3 style="padding: .5em; color: red;">Meal Booking App</h3>
            <div style="padding: .5em;">${mailBody}</div>
            <p style="padding: .5em;"><b> if you are not subscribed to Meal Booking App, kindly ignore this mail.</p></div>`,
        }
        sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
        sendGrid.send(message).then(() => true).catch((err) =>{
            console.log(err)
        })
    }

    /**
     * @description  Email notification for creating a new Meal
     * 
     * @param {object} mealData 
     * @param {string} email 
     */

    static async newMealMail(mealData){
      const bodyContent = `<h5>A new meal was added to the menu</h5> <p>${mealData.name}</p> <p>${mealData.description}</p> <br>
      <img src="${mealData.imageUrl}" width="75%" height="300px" alt="${mealData.name}" /> <br>
      <p>Order yours now for N ${mealData.price}</p>

      `;
      const getAllUsersQuery = `SELECT * FROM users ORDER BY id DESC`;
      const allUsers = await pool.query(getAllUsersQuery);
      const allUsersData = allUsers.rows;
      allUsersData.forEach(user => {
          if(user.role === 'customer'){
              emailSender.sendEmail(user.email, `New Meal Added to Menu`, bodyContent)   
          }
      });
    }
}

export default emailSender;