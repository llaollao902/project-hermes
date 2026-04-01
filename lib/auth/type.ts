import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import 'server-only';

export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims?.sub) return null;

  const { data: roles } = await supabase
    .from('role_assignments ')
    .select('role, scope_type, scope_id')
    .eq('user_id', claims.claims.sub);

  return {
    id: claims.claims.sub,
    email: claims.claims.email,
    roles: roles ?? [],
  };
});

export async function requireRole(allowed: string[]) {
  const user = await getCurrentUser();

  // Guards below
  if (!user) redirect('/auth/login');
  if (!user.roles.some((r) => allowed.includes(r.role))) redirect('/forbidden');
  return user;
}
