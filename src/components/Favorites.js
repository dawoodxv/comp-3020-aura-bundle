import React, { useState } from "react";
import { Box, Text, VStack, Button, Flex, Divider, Heading,Image, useTheme, Tooltip } from "@chakra-ui/react";
import { fetchProduct } from "../api/ApiClient";

const Favorites = () => {
  const theme = useTheme();

  const bundles = [
    {
      name: "Saved Bundle 1",
      productIds: [39, 12, 43, 35],
    },
  ];

  const [selectedBundle, setSelectedBundle] = useState(null);
  const [products, setProducts] = useState([]);

  const handleBundleClick = async (bundle) => {
    setSelectedBundle(bundle);
    const fetchedProducts = bundle.productIds.map((id) => fetchProduct(id));
    const resolvedProducts = await Promise.all(fetchedProducts);
    setProducts(resolvedProducts);
  };

  const calculateBundlePrice = () =>
    products.reduce((total, product) => total + product.price, 0).toFixed(2);

  return (
    <Box>
      {/* Banner Section */}
      <Box bg={theme.colors.primary} color={theme.colors.accent} py={4}>
        <Heading textAlign="center" fontSize="2xl" fontFamily="inherit">
          Your Saved Bundles
        </Heading>
      </Box>
      <Divider borderColor={theme.colors.textLight} />

      {/* Main Box */}
      <Box
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="sm"
        width="80%"
        margin="20px auto"
        display="flex"
        flexDirection="row"
        backgroundColor={theme.colors.background}
        p={6}
        minHeight="600px"
        maxHeight = "600px"
        borderColor={theme.colors.textLight}
      >
        {/* Left Section: List of Bundles */}
        <VStack
          spacing={6} 
          borderRight="1px solid"
          borderColor={theme.colors.textLight}
          width="30%"
          p={4}
          overflowY="scroll"
          align="stretch"
        >
          {bundles.map((bundle, index) => (
            <Text
              key={index}
              fontSize="lg"
              fontWeight="bold"
              p={6} 
              borderRadius="md"
              cursor="pointer"
              borderBottom="1px solid"
              backgroundColor={
                selectedBundle?.name === bundle.name
                  ? theme.colors.primary 
                  : "white" 
              }
              color={
                selectedBundle?.name === bundle.name
                  ? "white" 
                  : theme.colors.text
              }
              borderColor={selectedBundle?.name === bundle.name ? theme.colors.primary : theme.colors.textLight}
              onClick={() => handleBundleClick(bundle)}
              _hover={{
                backgroundColor: theme.colors.secondary,
                color: theme.colors.accent,
              }}
            >
              {bundle.name}
            </Text>
          ))}
        </VStack>

        {/* Right Section: Bundle Details */}
        <Flex flexDirection="column" flex="1" p={6}>
          {selectedBundle ? (
            <>
              <Text fontSize="2xl" fontWeight="bold" mb={4}>
                {selectedBundle.name}
              </Text>

              <VStack spacing={6} align="stretch" overflowY="scroll" width="100%">
                {products.map((product, index) => (
                  <Box key={index} borderBottom="1px solid" borderColor={theme.colors.textLight} pb={4}>
                    <Flex alignItems="center" mb={4}>
                      <Image
                        src={
                          require(`../data/images/${product.image.split("/").pop()}`) || null
                        }
                        boxSize="80px"
                        mr={4}
                        borderRadius="md"
                        objectFit="contain"
                      />
                      <Box flex="1">
                        <Text fontSize="lg" fontWeight="bold">
                          {product.brand} {product.name}
                        </Text>
                        <Text fontSize="sm" color={theme.colors.text}>
                          {product.details}
                        </Text>
                      </Box>
                      <Text fontSize="lg" fontWeight="bold" ml={4} paddingRight="10px">
                        ${product.price.toFixed(2)}
                      </Text>
                    </Flex>
                  </Box>
                ))}
              </VStack>

              {/* Bundle Price */}
              <Flex justify="space-between" mt={6} pt={4} borderTop="1px solid" borderColor={theme.colors.textLight}>
                <Text fontSize="lg" fontWeight="bold">
                  Total Bundle Price
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  ${calculateBundlePrice()}
                </Text>
              </Flex>

              {/* Add to Bag Button */}
              <Flex justify="center" mt={4}> {/* Reduced margin-top to 4 */}
                <Tooltip label="This is where the horizontal implementation ends. Bundle would simply be added to cart at this point. Accompanied by a pop up, (see build bundle behavior).">
                  <Button bg={theme.colors.primary} color={theme.colors.accent} size="lg" _hover={{ bg: theme.colors.secondary }}>
                    Add to Bag
                  </Button>
                </Tooltip>
              </Flex>
            </>
          ) : (
            <Text fontSize="lg" fontStyle="italic" color={theme.colors.textLight}>
              Choose a bundle to see details.
            </Text>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default Favorites;
