import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
export interface CarI {
  id?: number;
  marca: string;
  clase: string;
  modelo: number;
  cilindraje: number;
  capacidad: number;
}

export class Car extends Model {
  public id!: number;
  public marca!: string;
  public clase!: string;
  public modelo!: number;
  public cilindraje!: number;
  public capacidad!: number;
}

Car.init(
  {
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La marca no puede estar vacía" },
      },
    },
    clase: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: { args: [1900], msg: "El modelo debe ser mayor a 1900" },
      },
    },
    cilindraje: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Car",
    tableName: "cars",
    timestamps: false,
  }
);
