import { supabase } from '../config/supabase.js';

//app.use(express.json()); -- LINEA CAMBIADA

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const { data, error } = await supabase.from('usuarios').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por id
export const getUsuariosById = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un usuario (registro)
export const createUsuarios = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { nombre, email, contraseña } = req.body;

    if (!nombre || !email || !contraseña) {
      return res.status(400).json({ error: "Faltan datos para registrar usuario" });
    }

    const { data, error } = await supabase
      .from('usuarios')
      .insert([{ nombre, email, contraseña }])
      .select();

    if (error) throw error;

    res.status(201).json({ message: "Usuario registrado con éxito", user: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario
export const updateUsuarios = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, contraseña } = req.body;

  try {
    const { data, error } = await supabase
      .from('usuarios')
      .update({ nombre, email, contraseña })
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json({ message: "Usuario actualizado", user: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario
export const deleteUsuarios = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase.from('usuarios').delete().eq('id', id);
    if (error) throw error;

    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login de usuario
export const loginUsuario = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    if (!email || !contraseña) {
      return res.status(400).json({ error: "Faltan datos para login" });
    }

    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .eq('contraseña', contraseña)
      .single();

    if (error || !data) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.json({ message: "Login exitoso", user: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
