import { Router } from "express";
import carRoutes from "./car.routes";
import tuitionRoutes from "./tuition.routes"; // <--- Importa esto

const router = Router();

router.use("/cars", carRoutes);
router.use("/tuitions", tuitionRoutes); // <--- Registra esto

export default router;