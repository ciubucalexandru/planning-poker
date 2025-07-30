export const APP_ROUTES = {
	HOME: "/",
	ROOM: "/room/:roomCode",
};

export const API_ROUTES = {
	ROOMS: "/rooms",
	TASKS: "/tasks",
	JOIN_ROOM: "/users/join",
};

export interface TaskData {
	id: string;
	title: string;
	description: string;
	status: "pending" | "voting" | "completed";
}

export interface GetRoomData {
	is_moderator: boolean;
	room_code: string;
	room_id: string;
	username: string;
	tasks: TaskData[];
}
