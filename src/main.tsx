import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { router } from './router.tsx';
import { InnerApp } from './inner-app.component.tsx';
import { AuthProvider } from './contexts/auth-provider.component.tsx';

axios.defaults.baseURL = 'http://localhost:3000';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
