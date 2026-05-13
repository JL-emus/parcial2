import { Request, Response } from 'express';
import { Car } from '../models/Car';
import { Tuition } from '../models/Tuition';

export class CarController {

    // 1. Obtener todos los carros
    public async getAll(req: Request, res: Response) {
        try {
            const cars = await Car.findAll({
                include: { 
                    model: Tuition, 
                    as: 'matriculas' // Debe coincidir con el 'as' definido en la relación
                }
            });
            res.status(200).json(cars);
        } catch (error: any) {
            res.status(500).json({ msg: "Error al obtener carros", error: error.message });
        }
    }

    // 2. Obtener un carro por ID
    public async getOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const car = await Car.findByPk(Number(id), {
                include: { model: Tuition, as: 'matriculas' }
            });
            
            if (!car) {
                return res.status(404).json({ msg: "Carro no encontrado" });
            }
            res.status(200).json(car);
        } catch (error: any) {
            res.status(500).json({ msg: "Error en el servidor", error: error.message });
        }
    }

    // 3. Crear un carro nuevo
    public async create(req: Request, res: Response) {
        try {
            const body = req.body;
            const car = await Car.create(body);
            res.status(201).json(car);
        } catch (error: any) {
            res.status(400).json({ msg: "Error al crear el carro", error: error.message });
        }
    }

    // 4. Actualizar un carro
    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const body = req.body;
            
            const car = await Car.findByPk(Number(id));
            if (!car) return res.status(404).json({ msg: "Carro no existe" });

            await car.update(body);
            res.status(200).json({ msg: "Carro actualizado", car });
        } catch (error: any) {
            res.status(400).json({ msg: "Error al actualizar", error: error.message });
        }
    }

    // 5. Eliminar un carro
    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const car = await Car.findByPk(Number(id));
            
            if (!car) return res.status(404).json({ msg: "Carro no existe" });

            await car.destroy();
            res.status(200).json({ msg: "Carro eliminado correctamente" });
        } catch (error: any) {
            res.status(500).json({ msg: "Error al eliminar", error: error.message });
        }
    }
}