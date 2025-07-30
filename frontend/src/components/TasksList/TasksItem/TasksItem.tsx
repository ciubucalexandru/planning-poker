import React from "react";
import { Flex, Heading, Icon } from "@chakra-ui/react";
import type { TaskData } from "../../../types/types";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { RiProgress3Line, RiTodoFill } from "react-icons/ri";

type Props = Partial<TaskData>;

const getIcon = (status: string) => {
	switch (status) {
		case "pending":
			return <RiTodoFill />;
		case "voting":
			return <RiProgress3Line />;
		case "completed":
			return <IoCheckmarkCircleSharp />;
		default:
			return <RiTodoFill />; // Default icon
	}
};

const getColor = (status: string) => {
	switch (status) {
		case "pending":
			return "yellow.400";
		case "voting":
			return "blue.400";
		case "completed":
			return "green.400";
		default:
			return "gray.400"; // Default color
	}
};

const TasksItem: React.FC<Props> = ({ title, description, status }) => {
	return (
		<Flex
			justifyContent="space-between"
			alignItems="center"
			width="100%"
			paddingX="36px"
			paddingY="12px"
			cursor="pointer"
			_hover={{ bgColor: "#212121" }}
		>
			<Heading size="xl" color="white">
				{title}
			</Heading>
			<Icon size="xl" color={getColor(status || "pending")}>
				{getIcon(status || "todo")}
			</Icon>
		</Flex>
	);
};

export default TasksItem;
