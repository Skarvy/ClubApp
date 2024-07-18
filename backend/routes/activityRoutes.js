import express from 'express';
import { createActivity, getActivities, getActivityById, updateActivity, deleteActivity } from '../controllers/activityController.js';

const router = express.Router();

// Rutas para CRUD de actividades
router.post('/activities', createActivity); // Crear una nueva actividad
router.get('/activities', getActivities); // Obtener todas las actividades
router.get('/activities/:id', getActivityById); // Obtener una actividad por su ID
router.put('/activities/:id', updateActivity); // Actualizar una actividad por su ID
router.delete('/activities/:id', deleteActivity); // Eliminar una actividad por su ID

export default router;
