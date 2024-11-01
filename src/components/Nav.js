import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  Image,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const isLargeScreen = useBreakpointValue({ base: false, md: true });

  return (
    <Box bg="white" color="primary" py={3} px={6} boxShadow="sm">
      <Flex align="center" justify="space-between">
        <IconButton
          as={RouterLink}
          to="/"
          aria-label="Home"
          icon={<Image src="/images/logo.svg" alt="Logo" height="30px" />}
          isRound
          size="lg"
          _hover={{ bg: "secondary", color: "white" }}
        />

        {isLargeScreen && (
          <HStack spacing={4} flex="1" justify="center">
            <Button
              as={RouterLink}
              to="/"
              aria-label="Home"
              borderRadius="full"
              size="sm"
              _hover={{ bg: "secondary", color: "white" }}
            >
              Home
            </Button>
            <Button
              as={RouterLink}
              to="/buildBundle"
              aria-label="Build Your Own Bundle"
              borderRadius="full"
              size="sm"
              _hover={{ bg: "secondary", color: "white" }}
            >
              Build Your Own Bundle
            </Button>
            <Button
              as={RouterLink}
              to="/personalized-bundle"
              aria-label="Personalized Bundle"
              disabled
              borderRadius="full"
              size="sm"
              _hover={{ bg: "secondary", color: "white" }}
            >
              Personalized Bundle
            </Button>
            <Button
              as={RouterLink}
              to="/prebuilt-bundles"
              aria-label="Prebuilt Bundles"
              disabled
              borderRadius="full"
              size="sm"
              _hover={{ bg: "secondary", color: "white" }}
            >
              Prebuilt Bundles
            </Button>
          </HStack>
        )}

        <HStack spacing={4}>
          <IconButton
            as={RouterLink}
            to="/favorites"
            aria-label="Favorites"
            icon={<FaHeart />}
            disabled
            isRound
            size="lg"
            _hover={{ bg: "secondary", color: "white" }}
          />
          <IconButton
            as={RouterLink}
            to="/bag"
            aria-label="View Bag"
            icon={<FaShoppingBag />}
            isRound
            size="lg"
            _hover={{ bg: "secondary", color: "white" }}
          />
          <Button
            as={RouterLink}
            to="/sign-in"
            aria-label="Sign In"
            disabled
            borderRadius="full"
            size="md"
            _hover={{ bg: "secondary", color: "white" }}
          >
            Sign In
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
