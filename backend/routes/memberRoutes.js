import express from 'express';
import { createMember, getMembers, getMemberById, updateMember, deleteMember,getMemberByDNI,addActivityToMember } from '../controllers/memberController.js';

const router = express.Router();

// Rutas para CRUD de miembros
router.post('/members', createMember); // Crear un nuevo miembro
router.get('/members', getMembers); // Obtener todos los miembros
router.get('/members/:id', getMemberById); // Obtener un miembro por su ID
router.put('/members/:id', updateMember); // Actualizar un miembro por su ID
router.post('/members/:id/activities', addActivityToMember);
router.delete('/members/:id', deleteMember); // Eliminar un miembro por su ID
router.get('/dni/:dni', getMemberByDNI); // Ruta para buscar por DNI

export default router;
