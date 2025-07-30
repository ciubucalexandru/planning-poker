import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { APP_ROUTES } from "../types/types";
import RoomPage from "../pages/room/RoomPage";
import Homepage from "../pages/home/Homepage";

const AppRouter: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={APP_ROUTES.HOME} element={<Homepage />} />
				<Route path={APP_ROUTES.ROOM} element={<RoomPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
