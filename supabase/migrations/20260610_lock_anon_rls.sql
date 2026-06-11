-- =====================================================================
-- Fase B · Cierre de policies abiertas al rol anónimo (brecha art. 32)
-- BD COMPARTIDA (tfwnekfuqxpnezbjcbpj): landings + Panel AFCademia (panel_afcademia).
--
-- Patrón del problema: varias policies estaban como roles {anon,authenticated}
-- o {public} con USING(true). Por eso NO basta con DROP: hay que SUSTITUIR cada
-- una por su equivalente SOLO `authenticated`, para no quitarle el acceso al
-- panel (que entra como usuario autenticado). Solo se elimina el acceso `anon`.
--
-- Seguro para:
--   • Panel AFCademia → entra como `authenticated`: conserva todo (políticas _auth).
--   • Landings ya refactorizadas a server-side (service_role salta RLS): no usan anon.
-- Se conservan los *_insert anon por si alguna landing aún inserta client-side
-- (el INSERT no es el vector de fuga; lo grave era SELECT/UPDATE anónimos).
-- =====================================================================

-- ---- leads ----------------------------------------------------------
-- leads_select era {anon,authenticated} USING(true): lo sustituimos por auth-only.
drop policy if exists "leads_select" on public.leads;
create policy "leads_select_auth" on public.leads
  for select to authenticated using (true);
-- leads_update_public daba UPDATE a anon: se elimina (el panel ya tiene leads_update is_admin()).
drop policy if exists "leads_update_public" on public.leads;

-- ---- flujos_embudo --------------------------------------------------
drop policy if exists "flujos_select" on public.flujos_embudo;
create policy "flujos_select_auth" on public.flujos_embudo
  for select to authenticated using (true);

-- ---- access_tokens --------------------------------------------------
-- public_select / public_update aplicaban a TODOS los roles (public incluye
-- authenticated). Sustituir por versiones authenticated para no romper el panel.
drop policy if exists "public_select" on public.access_tokens;
create policy "access_tokens_select_auth" on public.access_tokens
  for select to authenticated using (true);
drop policy if exists "public_update" on public.access_tokens;
create policy "access_tokens_update_auth" on public.access_tokens
  for update to authenticated using (true) with check (true);

-- ---- fundae_seguimiento --------------------------------------------
-- ⚠️ NO TOCAR AQUÍ. Se intentó cerrar y ROMPIÓ el formulario público Fundae
-- del panel (FundaePublicForm.jsx lee/escribe fundae_seguimiento con la anon key:
-- embed `fundae_seguimiento(*)` al cargar y UPDATE al enviar). Revertido en vivo.
-- El cierre de fundae_seguimiento + fundae_form_tokens + fundae_alumnos_tokens
-- requiere refactor previo a RPCs SECURITY DEFINER en el panel. Tarea aparte.

-- ---- segmentacion_despacho -----------------------------------------
drop policy if exists "seg_select" on public.segmentacion_despacho;
create policy "seg_select_auth" on public.segmentacion_despacho
  for select to authenticated using (true);

-- =====================================================================
-- Verificación posterior — NO debe quedar anon/public en SELECT/UPDATE/DELETE:
--   select tablename, policyname, cmd, roles::text
--   from pg_policies
--   where schemaname='public'
--     and tablename in ('leads','flujos_embudo','access_tokens',
--                       'fundae_seguimiento','segmentacion_despacho')
--   order by tablename, cmd;
-- Esperado: solo {authenticated} (y, si se conservan, los *_insert con {anon}).
-- =====================================================================