import './RoomsId.scss';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import {
  fetchCheckmarkById,
  fetchNeighborhoodById,
  fetchRoomById,
} from '../../../api.ts';
import { useAuth } from '../../../hooks/use-auth.hook.ts';
import ScoringSheet from '../../../assets/scoring-sheet.png';
import Fence from '../../../assets/fence.png';
import Mark from '../../../assets/mark.png';
import { useMemo } from 'react';

export const Route = createFileRoute('/_protected/rooms/$id')({
  component: RouteComponent,
});

const getConstructionCoords = (index: number) => {
  switch (index) {
    case 0:
      return { top: 480, left: 220 };
    case 1:
      return { top: 480, left: 248 };
    case 2:
      return { top: 494, left: 234 };
    case 3:
      return { top: 506, left: 220 };
    case 4:
      return { top: 506, left: 248 };
    case 5:
      return { top: 520, left: 234 };
    case 6:
      return { top: 532, left: 220 };
    case 7:
      return { top: 532, left: 248 };
    case 8:
      return { top: 544, left: 234 };
    case 9:
      return { top: 558, left: 220 };
    case 10:
      return { top: 558, left: 248 };
  }
};

const getPoolsCoords = (index: number) => {
  return {
    top: 490 + 22 * Math.floor(index / 2),
    left: 150 + 21 * (index % 2),
  };
};

const getBisCoords = (index: number) => {
  return {
    top: 470 + 28 * Math.floor(index / 2),
    left: 510 + 24 * (index % 2),
  };
};

function RouteComponent() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const { navigate } = useRouter();

  const room = useQuery({
    queryKey: [`/rooms/${id}`],
    queryFn: () => fetchRoomById(id),
  });

  const checkmarkId = room.data?.PlayerRoomBoard?.find(
    prb => prb.playerId === user?.cuid
  )?.checkmark?.id;

  const neighborhoodId = room.data?.PlayerRoomBoard?.find(
    prb => prb.playerId === user?.cuid
  )?.neighborhood?.id;

  const checkmark = useQuery({
    queryKey: [`/checkmarks/${checkmarkId}`],
    queryFn: () => fetchCheckmarkById(checkmarkId!),
    enabled: !!checkmarkId,
  });

  const neighborhood = useQuery({
    queryKey: [`/neighborhoods/${neighborhoodId}`],
    queryFn: () => fetchNeighborhoodById(neighborhoodId!),
    enabled: !!neighborhoodId,
  });

  const firstStreetFences = useMemo(() => {
    // return [1, 1, 1, 1, 1, 1, 1, 1, 1];
    try {
      return JSON.parse(neighborhood.data?.firstStreetFences!) as number[];
    } catch {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
  }, [neighborhood.data?.firstStreetFences]);

  const firstStreetHouses = useMemo(() => {
    // return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    try {
      return JSON.parse(neighborhood.data?.firstStreetHouses!) as number[];
    } catch {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
  }, [neighborhood.data?.firstStreetHouses]);

  const secondStreetFences = useMemo(() => {
    // return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    try {
      return JSON.parse(neighborhood.data?.secondStreetFences!) as number[];
    } catch {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
  }, [neighborhood.data?.secondStreetFences]);

  const secondStreetHouses = useMemo(() => {
    // return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    try {
      return JSON.parse(neighborhood.data?.secondStreetHouses!) as number[];
    } catch {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
  }, [neighborhood.data?.secondStreetHouses]);

  const thirdStreetFences = useMemo(() => {
    // return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    try {
      return JSON.parse(neighborhood.data?.thirdStreetFences!) as number[];
    } catch {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
  }, [neighborhood.data?.thirdStreetFences]);

  const thirdStreetHouses = useMemo(() => {
    // return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    try {
      return JSON.parse(neighborhood.data?.thirdStreetHouses!) as number[];
    } catch {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
  }, [neighborhood.data?.thirdStreetHouses]);

  // const markedConstructions = 11;
  const markedConstructions = checkmark.data?.markedConstructions ?? 0;

  // const markedPools = 9;
  const markedPools = checkmark.data?.markedPools ?? 0;

  // const markedBis = 9;
  const markedBis = checkmark.data?.markedBis ?? 0;

  return (
    <div className="rooms-id">
      <div>
        <strong>Room id:</strong> {id}
      </div>
      <div style={{ position: 'relative' }}>
        <img src={ScoringSheet} alt="scoring sheet" width={682} height={682} />
        {firstStreetHouses.map(
          (h, index) =>
            h !== 0 && (
              <div
                key={`h1-${index}`}
                style={{
                  position: 'absolute',
                  fontSize: '1.5rem',
                  top: 85,
                  left: 172 + index * 45,
                }}>
                <strong>{h}</strong>
              </div>
            )
        )}
        {secondStreetHouses.map(
          (h, index) =>
            h !== 0 && (
              <div
                key={`h2-${index}`}
                style={{
                  position: 'absolute',
                  fontSize: '1.5rem',
                  top: 210,
                  left: 128 + index * 45,
                }}>
                <strong>{h}</strong>
              </div>
            )
        )}
        {thirdStreetHouses.map(
          (h, index) =>
            h !== 0 && (
              <div
                key={`h3-${index}`}
                style={{
                  position: 'absolute',
                  fontSize: '1.5rem',
                  top: 326,
                  left: 82 + index * 45,
                }}>
                <strong>{h}</strong>
              </div>
            )
        )}
        {firstStreetFences.map(
          (f, index) =>
            f === 1 && (
              <img
                src={Fence}
                alt="fence"
                key={`f1-${index}`}
                style={{
                  position: 'absolute',
                  top: 70,
                  left: 200 + index * 45,
                  width: 10,
                  height: 64,
                }}
              />
            )
        )}
        {secondStreetFences.map(
          (f, index) =>
            f === 1 && (
              <img
                src={Fence}
                alt="fence"
                key={`f2-${index}`}
                style={{
                  position: 'absolute',
                  top: 190,
                  left: 155 + index * 45,
                  width: 10,
                  height: 64,
                }}
              />
            )
        )}
        {thirdStreetFences.map(
          (f, index) =>
            f === 1 && (
              <img
                src={Fence}
                alt="fence"
                key={`f3-${index}`}
                style={{
                  position: 'absolute',
                  top: 310,
                  left: 110 + index * 45,
                  width: 10,
                  height: 64,
                }}
              />
            )
        )}
        {Array.from({ length: markedConstructions }).map((_, index) => (
          <img
            src={Mark}
            alt="mark"
            key={`mark-constructions-${index}`}
            style={{
              position: 'absolute',
              ...getConstructionCoords(index),
              width: 16,
              height: 10,
            }}
          />
        ))}
        {Array.from({ length: markedPools }).map((_, index) => (
          <img
            src={Mark}
            alt="mark"
            key={`mark-pools-${index}`}
            style={{
              position: 'absolute',
              ...getPoolsCoords(index),
              width: 16,
              height: 10,
            }}
          />
        ))}
        {Array.from({ length: markedBis }).map((_, index) => (
          <img
            src={Mark}
            alt="mark"
            key={`mark-bis-${index}`}
            style={{
              position: 'absolute',
              ...getBisCoords(index),
              width: 16,
              height: 10,
            }}
          />
        ))}
      </div>
      <button onClick={() => navigate({ to: '/home' })}>Go back</button>
    </div>
  );
}
