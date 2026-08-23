import type { Session, User } from "@supabase/supabase-js";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../../utils/supabase";
import { getUserProfile } from "../../features/user-profile/services/getUserProfile";
import type { UserProfile } from "../../features/user-profile/types";
import type { UserRoles } from "../types";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userProfile: UserProfile | undefined;
  userRole: UserRoles | undefined;
  loading: boolean;
  signIn: (_email: string, _password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(
    undefined,
  );
  const [userRole, setUserRole] = useState<UserRoles>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        await loadUser(session);
      } finally {
        setLoading(false);
      }
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        try {
          await loadUser(session);
        } finally {
          setLoading(false);
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const loadUser = async (session: Session | null) => {
    setSession(session);
    setUser(session?.user ?? null);

    if (!session) return;
    const [profile, role] = await Promise.all([
      getUserProfile(session?.user.id, null),
      getRole(),
    ]);

    setUserProfile(profile);
    setUserRole(role);
  };

  const getRole = async () => {
    const { data, error } = await supabase.auth.getClaims();
    if (error) throw error;

    const role = data?.claims.user_role as UserRoles;
    return role;
  };

  const signIn = async (_email: string, _password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: _email,
        password: _password,
      });
      if (error) throw error;

      const role = await getRole();
      if (role === "user") {
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

  return (
    <AuthContext.Provider
      value={{ session, user, userProfile, userRole, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
