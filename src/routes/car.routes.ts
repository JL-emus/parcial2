import { Router } from "express";
import { CarController } from "../controllers/car.controller";

const carController = new CarController();
const router = Router();

router.get("/", carController.getAll);
router.get("/:id", carController.getOne);
router.post("/", carController.create);
router.put("/:id", carController.update);
router.delete("/:id", carController.delete);

export default router;