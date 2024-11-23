import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  Image,
  HStack,
  Tooltip,
  useBreakpointValue,
  useTheme,
  Circle,
} from "@chakra-ui/react";
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const isLargeScreen = useBreakpointValue({ base: false, md: true });
  const location = useLocation();
  const theme = useTheme(); // Get the current theme
  const [bundleCount, setBundleCount] = useState(0);
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  const isBuildBundle = location.pathname === "/buildBundle";
  const isBag = location.pathname === "/bag";
  const isSignIn = location.pathname === "/signIn";
  const isQuiz = location.pathname === "/quiz";
  const isExploreBundles = location.pathname === "/exploreBundles";

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
            <Tooltip label="This feature is out of the scope of this vertical prototype. However, the idea is that the user could take a quiz about their skincare needs to get a bundle that is right for them.">
              <Button
                as={RouterLink}
                to="/quiz"
                aria-label="Personalized Bundle"
                borderRadius="full"
                size="sm"
                bg={isQuiz ? "primary" : theme.colors.gray[200]}
                color={isQuiz ? "white" : "black"}
                _hover={{ bg: "secondary", color: "white" }}
              >
                Personalized Bundles
              </Button>
            </Tooltip>
            <Tooltip label="This feature is out of the scope of this vertical prototype. However, this feature would allow the user to explore preset bundles.">
              <Button
                aria-label="Prebuilt Bundles"
                as={RouterLink}
                to="/exploreBundles"
                borderRadius="full"
                size="sm"
                bg={isExploreBundles ? "primary" : theme.colors.gray[200]}
                color={isExploreBundles ? "white" : "black"}
                _hover={{ bg: "secondary", color: "white" }}
              >
                Explore Bundles
              </Button>
            </Tooltip>
          </HStack>
        )}

        <HStack spacing={4}>
          <Tooltip label="This feature is out of the scope of this vertical prototype. However, the idea is to allow the user to store their favorite bundles and items to quickly purchase without going through more steps.">
            <IconButton
              aria-label="Favorites"
              icon={<FaHeart />}
              disabled
              isRound
              size="lg"
              _hover={{ bg: "secondary", color: "white" }}
            />
          </Tooltip>
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
          <Tooltip label="This feature is out of the scope of this vertical prototype. However, the idea is to take the user to a sign in/sign up page. A user profile could store a user’s past purchases, favorite items, and skin care needs.">
            <Button
              aria-label="Sign In"
              borderRadius="full"
              size="md"
              _hover={{ bg: "secondary", color: "white" }}
              onClick={() => navigate("/signIn")}
              bg={isSignIn ? "primary" : theme.colors.gray[200]}
              color={isSignIn ? "white" : "black"}
            >
              Sign In
            </Button>
          </Tooltip>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
