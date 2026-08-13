import type { Session, User } from "@supabase/supabase-js";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../../lib/supabase";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (_email: string, _password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const getRole = async () => {
    const { data, error } = await supabase.auth.getClaims();
    if (error) throw error;

    const role = data?.claims.user_role;
    return role;
  };

  const signIn = async (_email: string, _password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: _email, password: _password });
      if (error) throw error;

      const role = await getRole();
      if (role !== "admin") {
        await supabase.auth.signOut();
        throw new Error("Access denied: You must be an admin to login.");
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return <AuthContext.Provider value={{ session, user, loading, signIn, signOut }}>{children}</AuthContext.Provider>;
}
