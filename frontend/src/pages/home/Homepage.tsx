import React, { useState } from "react";
import { Container, Flex, Heading, Input } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { createRoom, joinRoom } from "../../services/apiCalls";
import { useNavigate } from "react-router";
import ActionButton from "../../components/buttons/ActionButton";
import GhostButton from "../../components/buttons/GhostButton";

const Homepage: React.FC = () => {
	const [roomCode, setRoomCode] = useState("");
	const [username, setUsername] = useState("");
	const navigate = useNavigate();

	const { mutate: roomJoining } = useMutation({
		mutationFn: joinRoom,
	});

	const { mutate: roomCreation } = useMutation({
		mutationFn: createRoom,
		onSuccess: (data) => {
			if (data) {
				navigate(`/room/${data.room_code}`);
			}
		},
	});

	const onJoinRoom = () => {
		if (roomCode && username) {
			roomJoining({ room_code: roomCode, username });
		}
	};

	const onCreateRoom = () => {
		if (username) {
			roomCreation({ username });
		}
	};

	return (
		<Container
			fluid
			height={"100vh"}
			display="flex"
			alignItems="center"
			justifyContent="center"
			backgroundColor="#161616"
		>
			<Flex
				width="450px"
				height="340px"
				backgroundColor="#313131"
				direction="column"
				alignItems="center"
				justifyContent="space-evenly"
				borderRadius="8px"
			>
				<Heading size="2xl">Welcome to PokerPlanner</Heading>
				<Input
					backgroundColor="#313131"
					width="80%"
					border="0"
					placeholder="Room ID"
					size="xl"
					onChange={(e) => setRoomCode(e.target.value)}
				/>
				<Input
					backgroundColor="#313131"
					width="80%"
					border="0"
					placeholder="Username"
					size="xl"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<Flex justifyContent="space-between" width="80%" height="52px">
					<ActionButton
						width="45%"
						borderRadius="24px"
						height="100%"
						backgroundColor="#e78007"
						color="#ffffff"
						onClick={onJoinRoom}
					>
						Join Room
					</ActionButton>
					<GhostButton
						width="45%"
						borderRadius="24px"
						height="100%"
						backgroundColor="#ffffff"
						onClick={onCreateRoom}
					>
						Create Room
					</GhostButton>
				</Flex>
			</Flex>
		</Container>
	);
};

export default Homepage;
