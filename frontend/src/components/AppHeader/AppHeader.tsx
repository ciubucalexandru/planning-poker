import { Flex, Heading, Icon } from "@chakra-ui/react";
import React from "react";
import { APP_HEADER_HEIGHT } from "../../utils/constants";
import { CgCalendar } from "react-icons/cg";
import ActionButton from "../buttons/ActionButton";
import { LuLogOut } from "react-icons/lu";

type Props = {
	roomCode: string;
	onExit: () => void;
};

const AppHeader: React.FC<Props> = ({ roomCode, onExit }) => {
	return (
		<Flex
			width="100%"
			backgroundColor="#313131"
			marginTop={0}
			height={APP_HEADER_HEIGHT}
			alignItems="center"
			justifyContent="space-between"
			padding="0 20px"
		>
			<Flex alignItems="center" justifyContent="space-evenly" gap={4}>
				<Icon size="2xl" color="white">
					<CgCalendar />
				</Icon>
				<Heading size={"3xl"} color="white">
					PokerPlanner -
				</Heading>
				<Heading size={"3xl"} color="#e78007">
					Room {roomCode}
				</Heading>
			</Flex>
			<Flex alignItems="center" justifyContent="space-evenly" gap={4}>
				<ActionButton borderRadius={15} onClick={onExit}>
					<Icon size="xl">
						<LuLogOut />
					</Icon>
				</ActionButton>
			</Flex>
		</Flex>
	);
};

export default AppHeader;
