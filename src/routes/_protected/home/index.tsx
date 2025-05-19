import './Home.scss';
import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../../../hooks/use-auth.hook.ts';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { Room } from '../../../types/room.model.ts';
import { RoomCard } from '../../../components/room-card/room-card.component.tsx';

export const Route = createFileRoute('/_protected/home/')({
  component: RouteComponent,
});

const fetchRooms = () => {
  return axios.get<Room[]>('/rooms').then(res => res.data);
};

function RouteComponent() {
  const { user, signOut } = useAuth();

  const rooms = useQuery({
    queryKey: ['rooms'],
    queryFn: fetchRooms,
  });

  return (
    <div className="home">
      <div>Welcome {user?.username?.split('@')[0]}</div>
      {rooms.isLoading ? (
        <div>Fetching rooms...</div>
      ) : rooms.isError ? (
        <div>Error fetching rooms...</div>
      ) : (
        <div>
          {rooms.data?.map(room => <RoomCard key={room.id} id={room.id} />)}
        </div>
      )}
      <button style={{ width: 'fit-content' }} onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}
