import { redirect } from "react-router";
import { supabase } from "../lib/supabase";

export default async function protectedLoader({ request }: { request: Request }) {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session?.user) {
    const url = new URL(request.url);
    const redirectTo = url.pathname + url.search;
    throw redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  return null;
}
