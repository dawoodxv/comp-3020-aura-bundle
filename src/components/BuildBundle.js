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
  Progress,
  Tooltip,
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
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedModalProduct, setSelectedModalProduct] = React.useState(null); // Track selected product for the modal
  const handleImageClick = (product) => {
    setSelectedModalProduct(product); // Set the selected product
    setIsImageModalOpen(true); // Open the modal
  };
  const closeImageModal = () => {
    setSelectedModalProduct(null); // Clear the selected product
    setIsImageModalOpen(false); // Close the image modal
  };

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

  const selectedCount = Object.values(selectedProducts).filter(Boolean).length;
  const progressPercentage = (selectedCount / 4) * 100;

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
                    handleImageClick={handleImageClick}
                  />
                </TabPanel>
              )
            )}
          </TabPanels>
        </Tabs>

        <Box mt={1} mb={2}>
          <Text fontSize="sm" mb={2}>
            Bundle Progress: {selectedCount} of 4 selected
          </Text>
          <Progress
            value={progressPercentage}
            size="sm"
            colorScheme="green"
            borderRadius="md"
          />
        </Box>
      </Box>

      <Divider orientation="vertical" height="auto" borderColor="gray.300" mr="4" />

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

                <Flex direction="column" justify="flex-end" align="flex-end" textAlign="right">
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
          <Box mt={2}>
            <Flex justify="space-between" align="center">
              <Tooltip label = "This is where the horizontal implementation ends. User created bundle (in current state) would be saved to Favourites page.">
                <Button
                  bg={isFavorited ? "primary" : "white"}
                  color={isFavorited ? "white" : "primary"}
                  _hover={{ bg: isFavorited ? "red.700" : "gray.100" }}
                  border="1px solid"
                  borderColor="primary"
                  onClick={() => setIsFavorited((prev) => !prev)}
                  isDisabled={!allProductsSelected}
                >
                  {isFavorited ? "Unfavorite" : "Favorite"}
                </Button>
              </Tooltip>
              <Button
                bg="primary"
                _hover={{ bg: "secondary" }}
                color="white"
                onClick={handleAddToBag}
                isDisabled={!allProductsSelected}
              >
                Add to Bag
              </Button>
            </Flex>
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
            <Button bg="primary" color="white" mr={3} _hover={{ bg: "secondary", color: "white" }} onClick={() => navigate("/bag")}>
              Go to Bag
            </Button>
            <Button
              bg="theme.colors.gray[200]"
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
        <Modal isOpen={isImageModalOpen} onClose={closeImageModal} isCentered>
          <ModalOverlay />
          <ModalContent maxW="600px" p={4}>
            {selectedModalProduct && (
              <>
                <ModalHeader>{selectedModalProduct.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box display="flex" flexDirection="row" gap={3}>
                    {/* Product Info on the Left */}
                    <Box flex="1" textAlign="left" pr={2}>
                      <Text fontSize="lg" fontWeight="bold">
                        Brand:
                      </Text>
                      <Text mb={1}>{selectedModalProduct.brand}</Text>

                      <Text fontSize="lg" fontWeight="bold">
                        Product Name:
                      </Text>
                      <Text mb={1}>{selectedModalProduct.name}</Text>

                      <Text fontSize="lg" fontWeight="bold">
                        Price:
                      </Text>
                      <Text mb={1}>${selectedModalProduct.price.toFixed(2)}</Text>

                      <Text fontSize="lg" fontWeight="bold">
                        Type:
                      </Text>
                      <Text mb={1}>{selectedModalProduct.type}</Text>
                    </Box>

                    {/* Product Image on the Right */}
                    <Box
                      flex="1"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      maxHeight="200px"
                      maxWidth="200px"
                    >
                      <Image
                        src={
                          require(`../data/images/${selectedModalProduct.image
                            .split("/")
                            .pop()}`) || null
                        }
                        alt={selectedModalProduct.name}
                        borderRadius="lg"
                        objectFit="contain"
                        height="100%"
                        maxWidth="100%"
                      />
                    </Box>
                  </Box>

                  {/* Details Section Spanning Full Width */}
                  <Box mt={4}>
                    <Text fontSize="lg" fontWeight="bold">
                      Details:
                    </Text>
                    <Text>{selectedModalProduct.details || "No details available."}</Text>
                  </Box>
                </ModalBody>

                <ModalFooter>
                  <Button
                    variant="solid"
                    bg={
                      selectedProducts[selectedModalProduct?.type]?.id ===
                      selectedModalProduct.id
                        ? "red.500"
                        : "primary"
                    }
                    _hover={
                      selectedProducts[selectedModalProduct?.type]?.id ===
                      selectedModalProduct.id
                        ? { bg: "red.700" }
                        : { bg: "secondary" }
                    }
                    color="white"
                    onClick={() => {
                      if (
                        selectedProducts[selectedModalProduct?.type]?.id ===
                        selectedModalProduct.id
                      ) {
                        handleRemoveProduct(selectedModalProduct.type); // Remove the product
                      } else {
                        handleProductSelect(selectedModalProduct); // Add the product
                      }
                      closeImageModal(); // Close the modal
                    }}
                  >
                    {selectedProducts[selectedModalProduct?.type]?.id ===
                    selectedModalProduct.id
                      ? "Remove"
                      : "Select"}
                  </Button>
                </ModalFooter>
              </>
            )}
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
  handleImageClick
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
                  require(`../data/images/${product.image.split("/").pop()}`) || null
                }
                borderRadius="lg"
                alt={product.name}
                width="100%"
                maxWidth="10rem"
                maxHeight="10rem"
                objectFit="contain"
                cursor="pointer" // Make the image look clickable
                onClick={() => handleImageClick(product)} // Open modal
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
                          : "primary",
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
