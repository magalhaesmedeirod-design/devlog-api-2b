import { Router } from "express";
import{list, create, getById, update, remove}from
'../controllers/projectController.js';
import { validateProject} from "../middlewares/validateProject.js";
import { authenticate } from "../middlewares/authenticate.js";
const router = Router();

// GET /api/v1/projects
router.get('/', list);

// POST /api/v1/projects
router.post('/', validateProject, create);

// GET /api/v1/projects/:id
router.get('/:id', getById);

// PATCH /api/v1/projects/:id
router.patch('/:id', validateProject, update);

// DELETE /api/v1/projects/:id
router.delete('/:id', remove);

export default router;