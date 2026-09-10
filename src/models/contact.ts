import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
import User from "./user.js";

interface ContactAttributes {
  id: number;
  userId: number;
  name: string;
  email : string;
  phone: string;
  company: string;
  address: string;
  city: string;
  state: string;
  country: string;
  notes: string;
  createdAt: Date;
  updatedAt : Date;
  createdBy: number;
  updatedBy: number;

}

interface ContactCreationAttributes 

extends Optional <
        ContactAttributes,
        "id"|
        "userId"|
        "name"|
        "email"|
        "phone"|
        "company"|
        "address"|
        "city"|
        "state"|
        "country"|
        "notes"|
        "createdAt"|
        "updatedAt"|
        "createdBy"|
        "updatedBy"
>{}

class Contact 
extends Model<ContactAttributes, ContactCreationAttributes>
implements ContactAttributes
{
  declare id: number;
  declare userId: number;
  declare name: string;
  declare email: string;
  declare phone: string;
  declare company: string;
  declare address: string;
  declare city: string;
  declare state: string;
  declare country: string;
  declare notes: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare createdBy: number;
  declare updatedBy: number;

}

Contact.init (
    {
    id: {
      type : DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      }
    },

      name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        company: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        createdBy: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: "id"
          }
        },
        updatedBy: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: "id"
          }
        }
  },
  {
    sequelize,
    tableName: "contact",
    modelName: "Contact",
    timestamps: true,

    indexes: [
      {
        fields: ["userId"]
      },
      {
        fields: ["email"]
      },
      {
        fields: ["phone"]
      },
      {
        fields: ["name"]
      },
      {
        unique: true,
        fields: ["userId", "phone"],
    }
    ]
  }
)

export default Contact