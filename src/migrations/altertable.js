import pool from "../models/db"

const alterOrderItemsQuery = `ALTER TABLE orderitem ALTER COLUMN mealName TYPE varchar(200), ALTER COLUMN mealImg TYPE varchar(200);`

const alterData = async () => {
    try {       
       const result = await pool.query(alterOrderItemsQuery)
       console.log(result)
        console.log("table altered sucessfully")
    } catch (error) {
        console.log(error)
    }
}
alterData()