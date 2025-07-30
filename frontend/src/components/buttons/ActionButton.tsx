import { Button, type ButtonProps } from "@chakra-ui/react";
import React from "react";

type Props = Partial<ButtonProps> & {
	children: React.ReactNode;
};

const ActionButton: React.FC<Props> = ({ children, ...props }) => {
	const actionButtonStyles = { backgroundColor: "#e78007", color: "#ffffff" };

	return (
		<Button {...props} {...actionButtonStyles}>
			{children}
		</Button>
	);
};

export default ActionButton;
