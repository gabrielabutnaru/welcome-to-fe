import { jwtDecode } from 'jwt-decode';
import { type PropsWithChildren, useEffect, useState } from 'react';
import axios from 'axios';
import { router } from '../router.tsx';
import { AuthContext, type User } from './auth.context.tsx';
import { useQueryClient } from '@tanstack/react-query';

const getUserFromJwt = (jwt: string | null) => {
  if (!jwt) return null;
  const decodedJwt = jwtDecode<{ username: string; sub: string }>(jwt);
  return { username: decodedJwt.username, cuid: decodedJwt.sub };
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(
    getUserFromJwt(localStorage.getItem('jwt'))
  );

  const queryClient = useQueryClient();

  const signIn = (jwt: string) => {
    localStorage.setItem('jwt', jwt);
    setUser(getUserFromJwt(jwt));
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    router.navigate({ to: '/home' });
  };

  const signOut = () => {
    localStorage.removeItem('jwt');
    setUser(null);
    axios.defaults.headers.common['Authorization'] = undefined;
    router.navigate({ to: '/auth' });
    queryClient.clear();
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
