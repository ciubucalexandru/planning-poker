import React from "react";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import AppHeader from "../../components/AppHeader/AppHeader";
import { useParams } from "react-router";
import TasksList from "../../components/TasksList/TasksList";
import { useRooms } from "../../services/useRooms";

type PageParams = {
	roomCode: string;
};

const RoomPage: React.FC = () => {
	const { roomCode } = useParams<PageParams>();
	const { data, isError } = useRooms();

	return (
		<>
			<AppHeader roomCode={roomCode || ""} onExit={() => {}} />
			<Container backgroundColor="#313131" padding={0} fluid borderTop="1px solid #212121">
				<Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(8, 1fr)">
					<GridItem colSpan={2}>
						<TasksList tasks={data?.tasks || []} isModerator={data?.is_moderator} />
					</GridItem>
					<GridItem colSpan={6} backgroundColor="#212121">
						Item 2
					</GridItem>
				</Grid>
			</Container>
		</>
	);
};

export default RoomPage;
