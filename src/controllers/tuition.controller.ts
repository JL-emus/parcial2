import { Request, Response } from 'express';
import { Tuition } from '../models/Tuition';
import { Car } from '../models/Car';

export class TuitionController {

    // Obtener todas las matrículas con la info de su carro
    public async getAll(req: Request, res: Response) {
        try {
            const tuitions = await Tuition.findAll({
                include: { model: Car, as: 'vehiculo' }
            });
            res.status(200).json(tuitions);
        } catch (error: any) {
            res.status(500).json({ msg: error.message });
        }
    }

    // Crear matrícula (Validando que el carro exista)
    public async create(req: Request, res: Response) {
        try {
            const { date_matricula, ciudad, pago, car_id } = req.body;

            // Verificamos si el carro al que se le va a asignar existe
            const carExists = await Car.findByPk(car_id);
            if (!carExists) {
                return res.status(404).json({ msg: "No se puede matricular: El carro no existe" });
            }

            const tuition = await Tuition.create({ date_matricula, ciudad, pago, car_id });
            res.status(201).json(tuition);
        } catch (error: any) {
            res.status(400).json({ msg: error.message });
        }
    }

    // Obtener una matrícula por ID
    public async getOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const tuition = await Tuition.findByPk(Number(id), {
                include: { model: Car, as: 'vehiculo' }
            });

            if (!tuition) return res.status(404).json({ msg: "Matrícula no encontrada" });
            res.status(200).json(tuition);
        } catch (error: any) {
            res.status(500).json({ msg: error.message });
        }
    }
}