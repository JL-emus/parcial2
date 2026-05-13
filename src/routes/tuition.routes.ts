import { Router } from "express";
import { TuitionController } from "../controllers/tuition.controller";

const tuitionController = new TuitionController();
const router = Router();

router.get("/", tuitionController.getAll);
router.get("/:id", tuitionController.getOne);
router.post("/", tuitionController.create);
router.put("/:id", tuitionController.update);
router.delete("/:id", tuitionController.delete);

export default router;