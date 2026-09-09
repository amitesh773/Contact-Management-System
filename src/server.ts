import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

import { credentials } from "./config/credentials.js";
import { dbConnection } from "./config/dbConnection.js";
dbConnection()
import "./models/user.js"

import auth from "./modules/routers/userRouter.js"
app.use("/auth", auth)

app.listen(credentials.PORT,()=>{
      console.log(`server is runng on port ${credentials.PORT}`)
})