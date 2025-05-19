import axios from 'axios';
import type { Room } from './types/room.model.ts';
import type { PlayerRoomBoard } from './types/player-room-board.model.ts';
import type { User } from './types/user.model.ts';
import type { Neighborhood } from './types/neighborhood.model.ts';
import type { Checkmark } from './types/checkmark.model.ts';

export const fetchRoomById = async (id: string) => {
  return (
    await axios.get<Room & { PlayerRoomBoard: PlayerRoomBoard[] }>(
      `/rooms/${id}`
    )
  ).data;
};

export const fetchUserById = async (id: string) => {
  return (await axios.get<User>(`/users/${id}`)).data;
};

export const fetchCheckmarkById = async (id: string) => {
  return (await axios.get<Checkmark>(`/checkmarks/${id}`)).data;
};

export const fetchNeighborhoodById = async (id: string) => {
  return (await axios.get<Neighborhood>(`/neighborhoods/${id}`)).data;
};
