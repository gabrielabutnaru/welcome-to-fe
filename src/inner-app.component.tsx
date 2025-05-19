import { RouterProvider } from '@tanstack/react-router';
import { router } from './router.tsx';
import { useAuth } from './hooks/use-auth.hook.ts';

export const InnerApp = () => {
  const { user, signIn, signOut } = useAuth();
  return <RouterProvider router={router} context={{ user, signIn, signOut }} />;
};
