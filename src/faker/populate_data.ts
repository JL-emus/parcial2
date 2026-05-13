import { faker } from '@faker-js/faker';
import { Car } from '../models/Car';
import { Tuition } from '../models/Tuition';

export const populateData = async () => {
    try {
        console.log('⏳ Iniciando el llenado de datos con Faker...');

        // 1. Crear 20 Carros
        const createdCars = [];
        for (let i = 0; i < 20; i++) {
            const car = await Car.create({
                marca: faker.vehicle.manufacturer(),
                clase: faker.vehicle.type(),
                modelo: faker.number.int({ min: 1990, max: 2025 }),
                cilindraje: faker.number.int({ min: 1000, max: 6000 }),
                capacidad: faker.number.int({ min: 2, max: 8 })
            });
            createdCars.push(car);
        }

        // 2. Crear 20 Matrículas (una para cada carro creado)
        for (let i = 0; i < 20; i++) {
            await Tuition.create({
                date_matricula: faker.date.past().toISOString().split('T')[0], // Formato YYYY-MM-DD
                ciudad: faker.location.city(),
                pago: parseFloat(faker.finance.amount({ min: 50, max: 500, dec: 2 })),
                car_id: createdCars[i]!.id 
            });
        }

        console.log('🚀 ¡Éxito! Se han insertado 20 carros y 20 matrículas.');
    } catch (error) {
        console.error('❌ Error al poblar la base de datos:', error);
    }
};