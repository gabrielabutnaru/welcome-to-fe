import { createRouter, Navigate } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';

export const router = createRouter({
  routeTree,
  context: {
    user: null,
    signIn: () => {},
    signOut: () => {},
  },
  notFoundMode: 'root',
  defaultNotFoundComponent: () => <Navigate to="/home" replace />,
});
