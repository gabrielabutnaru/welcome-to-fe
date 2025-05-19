import './Auth.scss';
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/use-auth.hook.ts';

export const Route = createFileRoute('/auth/')({
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({
        to: '/home',
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { signIn } = useAuth();
  const { navigate } = useRouter();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = useCallback(() => {
    if (username !== '' && password !== '') {
      axios
        .post<{ jwt: string }>('/users/login', { username, password })
        .then(res => {
          signIn(res.data.jwt);
          navigate({ to: '/home' });
        });
    }
  }, [navigate, password, signIn, username]);

  const handleRegister = useCallback(() => {
    if (username !== '' && password !== '') {
      axios
        .post<{
          jwt: string;
        }>('/users', { username, email: username, password })
        .then(res => {
          signIn(res.data.jwt);
          navigate({ to: '/home' });
        });
    }
  }, [navigate, password, signIn, username]);

  return (
    <div className="auth">
      <label htmlFor="username">Username: </label>
      <input
        name="username"
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password: </label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <button onClick={handleLogin}>Log In</button>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}
