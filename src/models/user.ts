import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
}

interface UserCreationAttributes
    extends Optional <UserAttributes, 
    "id"|
    "name"|
    "email"|
    "phone"|
    "password"
    > {}

class User 
extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
    {
      declare id: number;
      declare name: string;
      declare email: string;
      declare phone: string;
      declare password: string;

    }

    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        phone:{
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
      },
      {
        sequelize,
        tableName: "user",
        modelName: "User",
        timestamps: true,

      }
    )

    export default User