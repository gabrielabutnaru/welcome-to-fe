import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: '/auth',
        search: { redirect: location.href },
      });
    }
  },
  component: () => <Outlet />,
});
