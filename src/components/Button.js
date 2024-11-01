import React from "react";
import { Button, useTheme } from "@chakra-ui/react";

const CustomButton = ({ size, isDisabled, onClick, children }) => {
  const theme = useTheme();

  return (
    <Button
      bg={theme.colors.primary}
      color={theme.colors.text}
      _hover={{
        bg: theme.colors.secondary,
        boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)",
      }}
      boxShadow="inset 0 0 5px rgba(0, 0, 0, 0.3)"
      size={size}
      isDisabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
