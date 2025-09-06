import express from 'express';
import {
  getUsuarios,
  getUsuariosById,
  createUsuarios,
  updateUsuarios,
  deleteUsuarios,
  loginUsuario
} from '../controllers/usuariosController.js';

const router = express.Router();

// CRUD usuarios
router.get('/', getUsuarios);
router.get('/:id', getUsuariosById);
router.post('/', createUsuarios);
router.put('/:id', updateUsuarios);
router.delete('/:id', deleteUsuarios);

// LOGIN
router.post('/login', loginUsuario);

export default router;
