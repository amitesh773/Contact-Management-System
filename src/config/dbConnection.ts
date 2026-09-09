import { Sequelize } from "sequelize";
import { credentials } from "./credentials.js";

export const sequelize = new Sequelize(
  credentials.DB_NAME,
  credentials.DB_USER,
  credentials.DB_PASSWORD,
  {
    port: credentials.DB_PORT,
    host: credentials.DB_HOST,
    dialect: credentials.DB_DIALECT,
    logging: credentials.DB_LOGGING,

  }
  
)

export async function dbConnection() {
        try {
          await sequelize.authenticate();
          console.log("Database connected..!!!");

          await sequelize.sync({alter: false});
          console.log("Sequlized syncked..!!!")
          
        } catch (error) {
            console.error("Database Error: ", error)
        }
}