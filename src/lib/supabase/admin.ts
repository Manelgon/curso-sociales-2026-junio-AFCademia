import { createClient } from '@supabase/supabase-js'

// Cliente con service_role. SOLO se importa desde rutas de servidor (app/api/**).
// NUNCA debe acabar en un componente 'use client' ni en el bundle del navegador.
// La service_role key salta RLS, por eso vive en una env var sin prefijo NEXT_PUBLIC.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } }
)