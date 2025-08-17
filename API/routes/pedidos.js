import express from 'express';
import {
  getPedidos,
  getPedidosById,
  createPedidos,
  updatePedidos,
  deletePedidos
} from '../controllers/pedidosController.js';

const router = express.Router();

router.get('/', getPedidos);
router.get('/:id', getPedidosById);
router.post('/', createPedidos);
router.put('/:id', updatePedidos);
router.delete('/:id', deletePedidos);

export default router;