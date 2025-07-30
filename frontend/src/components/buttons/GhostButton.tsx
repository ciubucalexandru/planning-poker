import { Button, type ButtonProps } from "@chakra-ui/react";
import React from "react";

type Props = Partial<ButtonProps> & {
	children: React.ReactNode;
};

const GhostButton: React.FC<Props> = ({ children, ...props }) => {
	const ghostButtonStyles = { backgroundColor: "#ffffff" };

	return (
		<Button {...props} {...ghostButtonStyles}>
			{children}
		</Button>
	);
};

export default GhostButton;
