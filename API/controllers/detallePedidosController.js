import { supabase } from '../config/supabase.js';

// Obtener todos los detalles de pedidos
export const getdetallePedidos = async (req, res) => {
  console.log("llego aqui")
  const { data, error } = await supabase.from('detallePedidos').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Obtener un detalle de pedido por id
export const getdetallePedidosById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('detallePedidos').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ error: 'detalle del pedido no encontrado' });
  res.json(data);
};

// Crear un detalle de pedido
export const createdetallePedidos = async (req, res) => {
  console.log('request')
  console.log(req.body)
  const { cantidad, precio_unitario} = req.body;
  console.log(cantidad + ' ' + precio_unitario + ' ' )
  const { data, error } = await supabase
    .from('detallepedidos')
    .insert([{ cantidad, precio_unitario}])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
};

// Actualizar un detalle pedido
export const updatedetallePedidos = async (req, res) => {
  const { id } = req.params;
  const { cantidad, precio_unitario } = req.body;
  const { data, error } = await supabase
    .from('detallePedidos')
    .update({ cantidad, precio_unitario })
    .eq('id', id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Eliminar un detalle de pedido
export const deletedetallePedidos = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('detallePedidos').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Detalle de pedido eliminado' });
};