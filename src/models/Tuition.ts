import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Car } from "./Car";

export interface TuitionI {
  id?: number;
  date_matricula: string;
  ciudad: string;
  pago: number;
  car_id: number;
}

export class Tuition extends Model {
  public id!: number;
  public date_matricula!: string;
  public ciudad!: string;
  public pago!: number;
  public car_id!: number;
}

Tuition.init(
  {
    date_matricula: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { 
            args: true,
            msg: "Debe ser una fecha válida" },
      },
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La ciudad es obligatoria" },
      },
    },
    pago: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: { args: [0], msg: "El pago no puede ser negativo" },
      },
    },
    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Car,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Tuition",
    tableName: "tuitions",
    timestamps: false,
  }
);

Tuition.belongsTo(Car, {
  foreignKey: "car_id",
  targetKey: "id",
  as: "vehiculo"
});