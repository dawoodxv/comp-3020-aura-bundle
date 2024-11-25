import React from "react";
import {
  Box,
  Flex,
  Button,
  Image,
  Text,
  VStack,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const HomePage = () => {
  return (
    <Flex justify="center" align="center" height="auto" minHeight="80vh" mt="8">
      <Box
        width={{ base: "90%", md: "70%", lg: "50%" }}
        p={4}
        bg="white"
        borderRadius="lg"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        position="relative"
        textAlign="center"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Aura Bundles
        </Text>
        <Flex direction="row" align="center" justify="space-between" mb={10}>
          <VStack align="start" spacing={2} flex="1" textAlign="left">
            <Text fontSize="md" color="gray.600">
              At Aura Bundles, we believe that skincare should be as unique as
              you are. Our innovative platform empowers you to take charge of
              your skincare routine by offering a seamless way to create
              personalized bundles tailored to your specific needs. Whether
              you're looking for the perfect combination of a moisturizer,
              serum, cleanser, and sunscreen, or you prefer our thoughtfully
              curated pre-built bundles, we've got you covered.
            </Text>
            <Text fontSize="md" color="gray.600">
              Explore our diverse range of high-quality products, carefully
              selected to nourish and enhance your skin. Each bundle is designed
              to provide a complete skincare solution, allowing you to simplify
              your routine without sacrificing quality. With Aura Bundles,
              achieving radiant, healthy skin has never been easier. Discover
              the joy of customized skincare today and embrace the beauty of
              self-care.
            </Text>
          </VStack>
          <Image src="/images/logo.svg" alt="Brand Logo" width="250px" />
        </Flex>
        <Flex
          direction="column"
          align="center"
          justify="flex-end"
          height="100%"
        >
          <HStack spacing={4} width="100%" justify="center" mb={4}>
            <Tooltip label="This feature is out of the scope of this vertical prototype. However, this feature would allow the user to explore preset bundles.">
              <Button
                as={RouterLink}
                to="/ExploreBundles"
                bg="primary"
                color="white"
                _hover={{ bg: "secondary" }}
                size="lg"
                flexGrow={1}
                minWidth="120px"
                maxWidth="200px"
                isTruncated 
              >
                Explore Bundles
              </Button>
            </Tooltip>
            <Button
              as={RouterLink}
              to="/buildBundle"
              bg="primary"
              color="white"
              _hover={{ bg: "secondary" }}
              size="lg"
              flexGrow={1}
              minWidth="120px"
              maxWidth="200px"
              isTruncated
            >
              Build Your Own Bundle
            </Button>
            <Tooltip label="This feature is out of the scope of this vertical prototype. However, the idea is that the user could take a quiz about their skincare needs to get a bundle that is right for them.">   
              <Button
                as={RouterLink}
                to="/Quiz"
                bg="primary"
                color="white"
                _hover={{ bg: "secondary" }}
                size="lg"
                flexGrow={1}
                minWidth="120px"
                maxWidth="200px"
                isTruncated
              >
                Personalized Bundles
              </Button>
            </Tooltip>
          </HStack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default HomePage;
