import { API_ROUTES } from "../types/types";
import { BACKEND_URL } from "../utils/constants";

type CreateRoomParams = {
	username: string;
};

export const createRoom = async ({ username }: CreateRoomParams): Promise<any> => {
	const response = await fetch(`${BACKEND_URL}${API_ROUTES.ROOMS}`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username }),
	});

	return response.json();
};

type JoinRoomParams = {
	room_code: string;
	username: string;
};

export const joinRoom = async ({ room_code, username }: JoinRoomParams): Promise<any> => {
	const response = await fetch(`${BACKEND_URL}${API_ROUTES.JOIN_ROOM}`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ room_code, username }),
	});

	return response.json();
};

export const getRoom = async (): Promise<any> => {
	const response = await fetch(`${BACKEND_URL}${API_ROUTES.ROOMS}`, {
		method: "GET",
		credentials: "include",
	});

	return response.json();
};
