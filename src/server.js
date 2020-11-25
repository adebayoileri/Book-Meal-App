import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
// import path from "path"
import cors from "cors";
import profileRoute from "./routes/userRoutes";
import menuRoute from "./routes/menuRoutes";
import authRoute from "./routes/authRoutes";
import mealRoute from "./routes/mealRoutes";
import orderRoute from "./routes/orderRoutes";
import catererRoute from "./routes/catererRoutes";

dotenv.config();
const app = express();
// const frontend  = path.join(__dirname, "../client/build")
// app.use(express.static(frontend))

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "tiny"));
// orderRoute.use(bodyParser.json())
app.use("/api/v1", menuRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1", mealRoute);
app.use("/api/v1", profileRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", catererRoute);

const PORT = process.env.PORT || 4000;
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', 'PUT,DELETE,GET,PATCH,POST');
    return res.status(200).json({});
  }
  return next();
});
// app.use((req, res, next) =>{
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', '*')
//   // res
//   next();
// })

// app.get("/", (_, res) => {
//   return res.status(200).json({
//     message: "welcome to the mealbookingapp api",
//   });
// });

app.listen(PORT, () => {
  console.log(`Server runing on PORT ${PORT} visit http://localhost:${PORT}`);
});

export default app;
