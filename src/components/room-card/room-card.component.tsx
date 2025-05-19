import './RoomCard.scss';
import {
  useQueries,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';
import type { User } from '../../types/user.model.ts';
import { useRouter } from '@tanstack/react-router';
import { fetchRoomById, fetchUserById } from '../../api.ts';
import { useAuth } from '../../hooks/use-auth.hook.ts';

export const RoomCard = (props: { id: string }) => {
  const { user } = useAuth();

  const room = useQuery({
    queryKey: [`/rooms/${props.id}`],
    queryFn: () => fetchRoomById(props.id),
  });

  const owner = useQuery({
    queryKey: [`/users/${room.data?.ownerId}`],
    queryFn: () => fetchUserById(room.data?.ownerId),
    enabled: !!room.data?.ownerId,
  });

  const players = useQueries<UseQueryOptions<User>[]>({
    queries: (room.data?.PlayerRoomBoard ?? [])
      .filter(prb => prb.playerId !== room.data?.ownerId)
      .map(prb => ({
        queryKey: [`/users/${prb.playerId}`],
        queryFn: () => fetchUserById(prb.playerId),
      })),
  });

  const { navigate } = useRouter();

  return (
    <div className="room-card">
      <div className="room-card__element">
        <strong>Room id</strong>
        <div>{props.id.slice(0, 6)}...</div>
      </div>
      <div className="room-card__element">
        <strong>Owner</strong>
        <div>{owner.data?.username?.split('@')[0]}</div>
      </div>
      <div className="room-card__element">
        <strong>Player 2</strong>
        <div>{players[0]?.data?.username?.split('@')[0]}</div>
      </div>
      <div className="room-card__element">
        <strong>Player 3</strong>
        <div>{players[1]?.data?.username?.split('@')[0]}</div>
      </div>
      <div className="room-card__element">
        <strong>Player 4</strong>
        <div>{players[2]?.data?.username?.split('@')[0]}</div>
      </div>
      <div className="room-card__element">
        <strong>Status</strong>
        <div>{room.data?.status}</div>
      </div>
      {room.data?.PlayerRoomBoard?.find(prb => prb.playerId === user?.cuid) && (
        <div className="room-card__element">
          <strong>&nbsp;</strong>
          <button
            onClick={() => {
              navigate({ to: `/rooms/${room.data?.id}` });
            }}>
            Enter room
          </button>
        </div>
      )}
    </div>
  );
};
