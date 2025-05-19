import * as React from 'react';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import type { TAuthContext } from '../contexts/auth.context.tsx';

export const Route = createRootRouteWithContext<TAuthContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
