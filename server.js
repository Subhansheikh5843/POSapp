// packages import

import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";


//security packages
// .)blw for header safty 
import helmet from 'helmet'
// .)blw for data sfty of apis
import xss from 'xss-clean'

//mongos database sfty packge blw 
import mongoSanitize from 'express-mongo-sanitize' 

// .)the bw packge is applied in auth routes file which is used for login and register
//Ip limit means at limited time the user will be login the time we will give




// files import
import connectDB from "./config/db.js";

// /routes import
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errrorMiddleware from "./middlewares/errroMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoutes from "./routes/jobsRoute.js";

//config env
dotenv.config();

//mongodb connection
connectDB();

//rest objects
const app = express();

//middleware
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

//validation Middleware
app.use(errrorMiddleware);

//port
const PORT = process.env.PORT || 8080;

//listen

app.listen(PORT, () => {
  console.log(
    `Node server running ${process.env.DEV_MODE} in ${PORT}`.bgCyan.white
  );
});
