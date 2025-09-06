import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Asegúrate de que las variables de entorno estén definidas
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error('Faltan las variables de entorno SUPABASE_URL o SUPABASE_KEY');
}
// Puedes agregar un console.log para verificar que las variables se están leyendo correctamente
console.log('Supabase URL:', process.env.SUPABASE_URL);
console.log('Supabase Key:', process.env.SUPABASE_KEY);
// Ahora puedes usar `supabase` para interactuar con tu base de datos
