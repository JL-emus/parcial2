import { Request, Response } from 'express';
import { Tuition } from '../models/Tuition';
import { Car } from '../models/Car';

export class TuitionController {

    // 1. Obtener todas las matrículas (Incluyendo los datos del vehículo)
    public async getAll(req: Request, res: Response) {
        try {
            const tuitions = await Tuition.findAll({
                include: { 
                    model: Car, 
                    as: 'vehiculo' // Debe coincidir con el 'as' del belongsTo
                }
            });
            res.status(200).json(tuitions);
        } catch (error: any) {
            res.status(500).json({ msg: "Error al obtener matrículas", error: error.message });
        }
    }

    // 2. Obtener una matrícula por ID
    public async getOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const tuition = await Tuition.findByPk(Number(id), {
                include: { model: Car, as: 'vehiculo' }
            });

            if (!tuition) return res.status(404).json({ msg: "Matrícula no encontrada" });
            res.status(200).json(tuition);
        } catch (error: any) {
            res.status(500).json({ msg: "Error en el servidor", error: error.message });
        }
    }

    // 3. Crear una matrícula (Validando que el carro exista)
    public async create(req: Request, res: Response) {
        try {
            const { date_matricula, ciudad, pago, car_id } = req.body;

            // Verificamos si el carro padre existe antes de crear la matrícula
            const carExists = await Car.findByPk(car_id);
            if (!carExists) {
                return res.status(404).json({ msg: "No se puede matricular: El carro no existe" });
            }

            const tuition = await Tuition.create({ date_matricula, ciudad, pago, car_id });
            res.status(201).json(tuition);
        } catch (error: any) {
            res.status(400).json({ msg: "Error al crear matrícula", error: error.message });
        }
    }

    // 4. Actualizar una matrícula
    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const body = req.body;

            const tuition = await Tuition.findByPk(Number(id));
            if (!tuition) return res.status(404).json({ msg: "Matrícula no encontrada" });

            await tuition.update(body);
            res.status(200).json({ msg: "Matrícula actualizada", tuition });
        } catch (error: any) {
            res.status(400).json({ msg: "Error al actualizar", error: error.message });
        }
    }

    // 5. Eliminar una matrícula
    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const tuition = await Tuition.findByPk(Number(id));

            if (!tuition) return res.status(404).json({ msg: "Matrícula no encontrada" });

            await tuition.destroy();
            res.status(200).json({ msg: "Matrícula eliminada correctamente" });
        } catch (error: any) {
            res.status(500).json({ msg: "Error al eliminar", error: error.message });
        }
    }
}