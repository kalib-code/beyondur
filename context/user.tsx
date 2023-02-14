/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/database/client';

// @ts-ignore
const Context = createContext();

// create children interface
interface Props {
  children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const router = useRouter();
  let [user, setUser] = useState(supabase.auth.getSession());

  useEffect(() => {
    const getUserProfile = async () => {
      // @ts-ignore
      const { data } = supabase.auth.getSession();

      if (data) {
        const { data: profile } = await supabase
          .from('profile')
          .select('*')
          .eq('id', data.id)
          .single();

        setUser({
          ...data,
          ...profile,
        });
      }
    };

    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, []);

  const login = async (values: { email: string; password: string }) => {
    return await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    // @ts-ignore
    setUser(null);
    router.push('/');
  };

  const exposed = {
    user,
    login,
    logout,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default UserProvider;
