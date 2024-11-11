import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  Image,
  HStack,
  useBreakpointValue,
  useTheme,
  Text,
  Circle,
} from "@chakra-ui/react";
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import { Link as RouterLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const isLargeScreen = useBreakpointValue({ base: false, md: true });
  const location = useLocation();
  const theme = useTheme(); // Get the current theme
  const [bundleCount, setBundleCount] = useState(0);

  const isHome = location.pathname === "/";
  const isBuildBundle = location.pathname === "/buildBundle";
  const isBag = location.pathname === "/bag";

  useEffect(() => {
    const countBundlesInBag = () => {
      let count = 0;
      for (const key in localStorage) {
        if (key.startsWith("b_")) count += 1;
      }
      setBundleCount(count);
    };
    countBundlesInBag();
    window.addEventListener("storage", countBundlesInBag);
    return () => window.removeEventListener("storage", countBundlesInBag);
  }, []);

  return (
    <Box bg="white" color="primary" py={3} px={6} boxShadow="sm">
      <Flex align="center" justify="space-between">
        <IconButton
          as={RouterLink}
          to="/"
          aria-label="Home"
          bg={theme.colors.gray[200]}
          icon={<Image src="/images/logo.svg" alt="Logo" height="30px" />}
          isRound
          size="lg"
        />

        {isLargeScreen && (
          <HStack spacing={4} flex="1" justify="center" mx="2">
            <Button
              as={RouterLink}
              to="/"
              aria-label="Home"
              borderRadius="full"
              size="sm"
              bg={isHome ? "primary" : theme.colors.gray[200]}
              color={isHome ? "white" : "black"}
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
              bg={isBuildBundle ? "primary" : theme.colors.gray[200]}
              color={isBuildBundle ? "white" : "black"}
              _hover={{ bg: "secondary", color: "white" }}
            >
              Build a Bundle
            </Button>
            <Button
              aria-label="Personalized Bundle"
              disabled
              borderRadius="full"
              size="sm"
              _hover={{ bg: "secondary", color: "white" }}
            >
              Personalized Bundles
            </Button>
            <Button
              aria-label="Prebuilt Bundles"
              disabled
              borderRadius="full"
              size="sm"
              _hover={{ bg: "secondary", color: "white" }}
            >
              Our Bundles
            </Button>
          </HStack>
        )}

        <HStack spacing={4}>
          <IconButton
            aria-label="Favorites"
            icon={<FaHeart />}
            disabled
            isRound
            size="lg"
            _hover={{ bg: "secondary", color: "white" }}
          />

          <Box position="relative">
            <IconButton
              as={RouterLink}
              to="/bag"
              aria-label="View Bag"
              icon={<FaShoppingBag />}
              isRound
              size="lg"
              bg={isBag ? "primary" : theme.colors.gray[200]}
              color={isBag ? "white" : "black"}
              _hover={{ bg: "secondary", color: "white" }}
            />
            {bundleCount > 0 && (
              <Circle
                size="20px"
                bg="red.500"
                color="white"
                position="absolute"
                top="-3px"
                right="-3px"
                fontSize="xs"
                fontWeight="bold"
              >
                {bundleCount}
              </Circle>
            )}
          </Box>

          <Button
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
