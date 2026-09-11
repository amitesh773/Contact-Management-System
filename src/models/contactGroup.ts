import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
import User from "./user.js";

interface ContactGroupAttributes {
  id: number;
  userId: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

interface ContactGroupCreationAttributes
  extends Optional<
    ContactGroupAttributes,
    "id" |
    "userId" |
    "name" |
    "description" |
    "createdAt" |
    "updatedAt" |
    "createdBy" |
    "updatedBy"
  > { }

class ContactGroup
  extends Model<ContactGroupAttributes,
    ContactGroupCreationAttributes
  > implements ContactGroupAttributes {
  declare id: number;
  declare userId: number;
  declare name: string;
  declare description: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare createdBy: number;
  declare updatedBy: number;
}

ContactGroup.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,

    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id"
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
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
        key: "id",
      },
    },

    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "contact_group",
    modelName: "Contact_Group",
    timestamps: true,

    indexes: [
      {
        fields: ["userId"],
      },
      {
        fields: ["name"],
      },
      {
        unique: true,
        fields: ["userId", "name"],
      },
    ]
  }
)

export default ContactGroup