import { Request, Response } from 'express';
import { Car } from '../models/Car';
import { Tuition } from '../models/Tuition';

export class CarController {

    // Obtener todos los carros
    public async getAll(req: Request, res: Response) {
        try {
            const cars = await Car.findAll({
                include: { model: Tuition, as: 'matriculas' }
            });
            res.status(200).json(cars);
        } catch (error: any) {
            res.status(500).json({ msg: error.message });
        }
    }

    // Crear un nuevo carro
    public async create(req: Request, res: Response) {
        try {
            const body = req.body;
            const car = await Car.create(body);
            res.status(101).json(car);
        } catch (error: any) {
            res.status(400).json({ msg: error.message });
        }
    }

    // Obtener un solo carro por ID
    public async getOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const car = await Car.findByPk(Number(id), {
                include: { model: Tuition, as: 'matriculas' }
            });
            if (!car) return res.status(404).json({ msg: "Carro no encontrado" });
            res.status(200).json(car);
        } catch (error: any) {
            res.status(500).json({ msg: error.message });
        }
    }
}