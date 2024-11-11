import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  SimpleGrid,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Card,
  Stack,
  Divider,
  useTheme,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { fetchProductsByType } from "../api/ApiClient";
import { useNavigate } from "react-router-dom";

const BuildBundle = () => {
  const [selectedType, setSelectedType] = useState("Cleanser");
  const [selectedProducts, setSelectedProducts] = useState({
    Cleanser: null,
    Moisturizer: null,
    Serum: null,
    Sunscreen: null,
  });
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleProductSelect = (product) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [selectedType]: product,
    }));
  };

  const handleRemoveProduct = (type) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [type]: null,
    }));
  };

  const totalPrice = Object.values(selectedProducts)
    .filter((product) => product)
    .reduce((acc, product) => acc + product.price, 0);

  const allProductsSelected = Object.values(selectedProducts).every(
    (product) => product !== null
  );

  const handleAddToBag = () => {
    const uniqueId = Date.now();
    const productIds = Object.values(selectedProducts).map(
      (product) => product && product.id
    );
    localStorage.setItem(`b_${uniqueId}`, JSON.stringify(productIds));

    onOpen();
  };

  return (
    <Flex justify="center">
      <Box flex="1" pr={2} textAlign="center">
        <Tabs
          variant="enclosed"
          colorScheme="primary"
          onChange={(index) =>
            setSelectedType(
              ["Cleanser", "Moisturizer", "Serum", "Sunscreen"][index]
            )
          }
        >
          <TabList display="flex" justifyContent="space-between" width="100%">
            {["Cleanser", "Moisturizer", "Serum", "Sunscreen"].map((type) => (
              <Tab
                key={type}
                flex="1"
                _selected={{ bg: "primary", color: "accent" }}
                _hover={{ bg: "secondary", color: "accent" }}
                textAlign="center"
              >
                {type}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {["Cleanser", "Moisturizer", "Serum", "Sunscreen"].map(
              (type, index) => (
                <TabPanel key={type}>
                  <ProductGrid
                    products={fetchProductsByType(type)}
                    onProductSelect={handleProductSelect}
                    onProductDeselect={handleRemoveProduct}
                    selectedProduct={selectedProducts[type]}
                  />
                </TabPanel>
              )
            )}
          </TabPanels>
        </Tabs>
      </Box>

      <Divider
        orientation="vertical"
        height="auto"
        borderColor="gray.300"
        mr="4"
      />

      <Box width="17rem" mt="3" mr="1">
        <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
          Your Bundle
        </Text>
        <Stack spacing={2}>
          {Object.entries(selectedProducts).map(([type, product]) => (
            <Box key={type} p={4} borderRadius="lg" bg="gray.100" height="8rem">
              <Flex justify="space-between" height="100%">
                <Box>
                  <Text fontWeight="bold">{type}</Text>
                  <Flex direction="column" textAlign="left">
                    {product ? (
                      <>
                        <Text fontSize="sm" isTruncated maxWidth="10rem">
                          {product.brand}
                        </Text>
                        <Text fontSize="sm" isTruncated maxWidth="10rem">
                          {product.name}
                        </Text>
                      </>
                    ) : (
                      <Text fontSize="sm" color="gray.500">
                        None selected
                      </Text>
                    )}
                  </Flex>
                </Box>

                <Flex
                  direction="column"
                  justify="flex-end"
                  align="flex-end"
                  textAlign="right"
                >
                  {product && (
                    <>
                      <Text fontWeight="medium">
                        ${product.price.toFixed(2)}
                      </Text>
                      <Button
                        size="xs"
                        colorScheme="red"
                        onClick={() => handleRemoveProduct(type)}
                        mb={1}
                      >
                        Remove
                      </Button>
                    </>
                  )}
                </Flex>
              </Flex>
              <Divider mt="5" />
            </Box>
          ))}
        </Stack>

        <Box mt={4}>
          <Divider
            orientation="horizontal"
            height="auto"
            borderColor="gray.300"
          />
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" fontWeight="bold">
              Total:
            </Text>
            <Text fontSize="lg" fontWeight="bold" textAlign="right">
              ${totalPrice.toFixed(2)}
            </Text>
          </Flex>
          <Box mt={2} textAlign="right">
            <Button
              bg="primary"
              _hover={{ bg: "secondary" }}
              color="white"
              onClick={handleAddToBag}
              isDisabled={!allProductsSelected}
            >
              Add to Bag
            </Button>
          </Box>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bundle Added to Bag</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Your bundle has been added to your bag.</Text>
            <Text>Would you like to continue shopping or go to your bag?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => navigate("/bag")}>
              Go to Bag
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedProducts({
                  Cleanser: null,
                  Moisturizer: null,
                  Serum: null,
                  Sunscreen: null,
                });
                onClose();
              }}
            >
              Continue Shopping
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

const ProductGrid = ({
  products,
  onProductSelect,
  onProductDeselect,
  selectedProduct,
}) => {
  const theme = useTheme();
  return (
    <Box height="80vh" overflowY="scroll">
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {products.map((product) => (
          <Card key={product.id} variant="outline" size="sm" maxW="sm">
            <Flex justify="center" align="center" mt={2}>
              <Image
                src={
                  require(`../data/images/${product.image.split("/").pop()}`) ||
                  null
                }
                borderRadius="lg"
                alt={product.name}
                width="100%"
                maxWidth="10rem"
                maxHeight="10rem"
                objectFit="contain"
              />
            </Flex>
            <Box p={2}>
              <Flex justify="space-between" align="center">
                <Box textAlign={"left"}>
                  <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
                    {product.brand}
                  </Text>
                  <Text noOfLines={1}>{product.name}</Text>
                </Box>
                <Box>
                  <Text fontSize="l" fontWeight="medium">
                    ${product.price.toFixed(2)}
                  </Text>
                  <Button
                    bg={
                      selectedProduct && selectedProduct.id === product.id
                        ? "red.500"
                        : theme.colors.gray[200]
                    }
                    color={
                      selectedProduct && selectedProduct.id === product.id
                        ? "white"
                        : "black"
                    }
                    _hover={{
                      bg:
                        selectedProduct && selectedProduct.id === product.id
                          ? "red.700"
                          : "secondary",
                      color: "white",
                    }}
                    onClick={() =>
                      selectedProduct && selectedProduct.id === product.id
                        ? onProductDeselect(selectedProduct.type)
                        : onProductSelect(product)
                    }
                    width="5rem"
                  >
                    {selectedProduct && selectedProduct.id === product.id
                      ? "Remove"
                      : "Select"}
                  </Button>
                </Box>
              </Flex>
            </Box>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default BuildBundle;
