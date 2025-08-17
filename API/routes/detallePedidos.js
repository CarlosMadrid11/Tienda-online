import express from 'express';
import {
  getdetallePedidos,
  getdetallePedidosById,
  createdetallePedidos,
  updatedetallePedidos,
  deletedetallePedidos
} from '../controllers/detallePedidosController.js';

const router = express.Router();

router.get('/', getdetallePedidos);
router.get('/:id', getdetallePedidosById);
router.post('/', createdetallePedidos);
router.put('/:id', updatedetallePedidos);
router.delete('/:id', deletedetallePedidos);

export default router;