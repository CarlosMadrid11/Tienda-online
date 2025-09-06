import { supabase } from '../config/supabase.js';

// Obtener todos los productos
export const getProductos = async (req, res) => {
  console.log("llego aqui")
  const { data, error } = await supabase.from('productos').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Obtener un producto por id
export const getProductoById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('productos').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(data);
};

// Crear un producto
export const createProducto = async (req, res) => {
  console.log('request')
  console.log(req.body)
  const { nombre, precio, stock, descripcion } = req.body;
  console.log(nombre + ' ' + precio + ' ' + descripcion +  '  ')
  const { data, error } = await supabase
    .from('productos')
    .insert([{ nombre, precio , stock, descripcion }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
};

// Actualizar un producto
export const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, descripcion } = req.body;
  const { data, error } = await supabase
    .from('productos')
    .update({ nombre, precio, descripcion })
    .eq('id', id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Eliminar un producto
export const deleteProducto = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('productos').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Producto eliminado' });
};
