import dotenv from "dotenv";
dotenv.config();
import {type Dialect } from "sequelize";


export const credentials = {
  PORT: process.env.PORT,

  DB_NAME: process.env.DB_NAME as string,
  DB_USER: process.env.DB_USER as string,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST as string,
  DB_PORT: Number(process.env.DB_PORT),
  DB_DIALECT: process.env.DB_DIALECT as Dialect,
  DB_LOGGING: Boolean(process.env.DB_LOGGING) ,

  JWT_SECRET: process.env.JWT_SECRET as string





}