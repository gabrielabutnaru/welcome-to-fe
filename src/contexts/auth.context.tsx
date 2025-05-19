import { createContext } from 'react';

export type User = {
  username: string;
  cuid: string;
};

export type TAuthContext = {
  user: User | null;
  signIn: (_: string) => void;
  signOut: () => void;
};

export const AuthContext = createContext<TAuthContext>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signIn: (_: string) => {},
  signOut: () => {},
});
