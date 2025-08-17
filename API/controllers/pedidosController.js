import { supabase } from '../config/supabase.js';

// Obtener todos los pedidos
export const getPedidos = async (req, res) => {
  console.log("llego aqui")
  const { data, error } = await supabase.from('pedidos').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Obtener un pedido por id
export const getPedidosById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('pedidos').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ error: 'Pedido no encontrado' });
  res.json(data);
};

// Crear un pedido
export const createPedidos = async (req, res) => {
  console.log('request')
  console.log(req.body)
  const { fecha, total} = req.body;
  console.log(fecha + ' ' + total + ' ' )
  const { data, error } = await supabase
    .from('pedidos')
    .insert([{ fecha, total}])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
};

// Actualizar un pedido
export const updatePedidos = async (req, res) => {
  const { id } = req.params;
  const { fecha, total } = req.body;
  const { data, error } = await supabase
    .from('pedidos')
    .update({ fecha, total })
    .eq('id', id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Eliminar un pedido
export const deletePedidos = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('pedidos').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Pedido eliminado' });
};
