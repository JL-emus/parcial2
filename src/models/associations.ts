import { Car } from "./Car";
import { Tuition } from "./Tuition";

export const setupAssociations = () => {
    // Relación: Un Carro tiene muchas Matrículas
    Car.hasMany(Tuition, {
        foreignKey: "car_id",
        sourceKey: "id",
        as: "matriculas"
    });

    // Relación: Una Matrícula pertenece a un Carro
    Tuition.belongsTo(Car, {
        foreignKey: "car_id",
        targetKey: "id",
        as: "vehiculo"
    });
};