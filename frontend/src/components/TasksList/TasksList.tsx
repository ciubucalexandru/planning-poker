import React from "react";
import { Heading, Stack, Text } from "@chakra-ui/react";
import type { TaskData } from "../../types/types";
import TasksItem from "./TasksItem/TasksItem";
import GhostButton from "../buttons/GhostButton";

type Props = {
	tasks: TaskData[];
	isModerator?: boolean;
};

const TasksList: React.FC<Props> = ({ tasks, isModerator = false }) => {
	return (
		<Stack alignItems="flex-start" margin={0}>
			<Heading size={"2xl"} color="white" marginLeft={4} padding="20px 0">
				Tasks
			</Heading>
			{tasks.length ? (
				tasks.map((task) => <TasksItem {...task} key={task.id} />)
			) : (
				<Text color="white">No tasks available</Text>
			)}
			{isModerator && (
				<GhostButton width="80%" borderRadius={20} alignSelf={"center"} marginTop="16px">
					Add Task
				</GhostButton>
			)}
		</Stack>
	);
};

export default TasksList;
