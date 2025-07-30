import { useQuery } from "@tanstack/react-query";
import { getRoom } from "./apiCalls";
import type { GetRoomData } from "../types/types";

export const useRooms = () => {
	return useQuery<GetRoomData>({
		queryKey: ["rooms"],
		queryFn: getRoom,
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};
