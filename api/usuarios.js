// api/usuarios.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const { method, query } = req;

  if (method === 'GET') {
    if (query.id) {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', query.id)
        .single();

      if (error) return res.status(404).json({ error: 'Usuario no encontrado' });
      return res.status(200).json(data);
    }

    const { data, error } = await supabase
      .from('usuarios')
      .select('*');

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).json({ error: `Método ${method} no permitido` });
}