import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

import { credentials } from "./config/credentials.js";
import { dbConnection } from "./config/dbConnection.js";
dbConnection()
import "./models/user.js"
import "./models/contact.js"
import "./models/contactGroup.js"


import auth from "./modules/routers/userRouter.js"
import contacts from "./modules/routers/contactRouter.js"
import contactGrout from "./modules/routers/contactGroupRouter.js"

app.use("/auth", auth)
app.use("/contact",contacts)
app.use("/group",contactGrout)

app.listen(credentials.PORT,()=>{
      console.log(`server is runng on port ${credentials.PORT}`)
})