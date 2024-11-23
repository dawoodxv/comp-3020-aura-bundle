import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  Input,
  Stack,
  Divider,
  Progress,
  Select,
} from "@chakra-ui/react";
import { FaTrashAlt, FaArrowLeft } from "react-icons/fa";
import { fetchBundle } from "../api/ApiClient";
import { useNavigate } from "react-router-dom";

const Bag = () => {
  const [bundles, setBundles] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedBundles = [];
    for (const key in localStorage) {
      if (key.startsWith("b_")) {
        const productIds = JSON.parse(localStorage.getItem(key));
        const bundle = fetchBundle(productIds);
        const bundleTotal = bundle.reduce(
          (acc, product) => acc + product.price,
          0
        );
        savedBundles.push({ id: key, products: bundle, total: bundleTotal });
      }
    }
    setBundles(savedBundles);
  }, []);

  const handleRemoveBundle = (bundleId) => {
    localStorage.removeItem(bundleId);
    setBundles((prevBundles) => prevBundles.filter((b) => b.id !== bundleId));
  };

  const handlePlaceOrder = () => {
    localStorage.clear();
    setBundles([]);
    setStep(4);
  };

  const validateContactForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;
    const postalCodePattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

    const newErrors = {
      email: !emailPattern.test(contactInfo.email || "")
        ? "Invalid email format"
        : "",
      firstName: !contactInfo.firstName ? "First name is required" : "",
      lastName: !contactInfo.lastName ? "Last name is required" : "",
      address: !contactInfo.address ? "Address is required" : "",
      city: !contactInfo.city ? "City is required" : "",
      province: !contactInfo.province ? "Province is required" : "",
      postalCode: !postalCodePattern.test(contactInfo.postalCode || "")
        ? "Invalid postal code format"
        : "",
      phone: !phonePattern.test(contactInfo.phone || "")
        ? "Phone number must be 10 digits"
        : "",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const validatePaymentForm = () => {
    const cardPattern = /^\d{16}$/;
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvPattern = /^\d{3}$/;

    const newErrors = {
      cardName: !paymentInfo.cardName ? "Cardholder's name is required" : "",
      cardNumber: !cardPattern.test(paymentInfo.cardNumber || "")
        ? "Card number must be 16 digits"
        : "",
      expiry: !expiryPattern.test(paymentInfo.expiry || "")
        ? "Expiry date format is MM/YY"
        : "",
      cvv: !cvvPattern.test(paymentInfo.cvv || "")
        ? "CVV must be 3 digits"
        : "",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const updateFormValidity = () => {
    if (step === 1) {
      setIsFormValid(validateContactForm());
    } else if (step === 2) {
      setIsFormValid(validatePaymentForm());
    }
  };

  useEffect(() => {
    updateFormValidity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactInfo, paymentInfo]);

  const handleFormChange = (event, setForm) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    updateFormValidity();
  };

  const handlePostalCodeChange = (e) => {
    let value = e.target.value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (value.length > 3) {
      value = `${value.slice(0, 3)} ${value.slice(3, 6)}`;
    }
    setContactInfo((prev) => ({ ...prev, postalCode: value }));
    setTouchedFields((prev) => ({ ...prev, postalCode: true }));
    updateFormValidity();
  };

  const totalAmount = bundles.reduce((acc, bundle) => acc + bundle.total, 0);

  return (
    <Flex p={5} align="flex-start" justify="space-between">
      <Box flex="1" mr={4}>
        <Text fontSize="2xl" mb={4}>
          Your Bag
        </Text>
        {bundles.length === 0 ? (
          <Text fontSize="xl" color="gray.500" mb={4}>
            Your cart is empty. Please add items to your cart.
          </Text>
        ) : (
          <Accordion defaultIndex={[0]} allowMultiple>
            {bundles.map((bundle, index) => (
              <AccordionItem
                key={bundle.id}
                mb={2}
                border="1px solid #e2e8f0"
                borderRadius="md"
              >
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontWeight="bold">Bundle #{index + 1}</Text>
                    <Text fontSize="sm">Total: ${bundle.total.toFixed(2)}</Text>
                    <Flex mt={2}>
                      {bundle.products.slice(0, 4).map((product, idx) => (
                        <Image
                          key={idx}
                          src={
                            require(`../data/images/${product.image
                              .split("/")
                              .pop()}`) || null
                          }
                          boxSize="30px"
                          mr={2}
                          borderRadius="md"
                        />
                      ))}
                    </Flex>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  {bundle.products.map((product) => (
                    <Flex key={product.id} align="center" mb={3}>
                      <Image
                        src={
                          require(`../data/images/${product.image
                            .split("/")
                            .pop()}`) || null
                        }
                        boxSize="50px"
                        mr={3}
                      />
                      <Box flex="1">
                        <Text fontWeight="bold">{product.name}</Text>
                        <Text fontSize="sm">{product.brand}</Text>
                        <Text fontSize="sm">${product.price.toFixed(2)}</Text>
                      </Box>
                    </Flex>
                  ))}
                  <Button
                    leftIcon={<FaTrashAlt />}
                    colorScheme="red"
                    size="sm"
                    mt={2}
                    onClick={() => handleRemoveBundle(bundle.id)}
                  >
                    Remove Bundle
                  </Button>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </Box>

      <Box flex="0.4" p={5} border="1px solid #e2e8f0" borderRadius="md">
        {step > 1 && step < 4 && (
          <Button
            leftIcon={<FaArrowLeft />}
            variant="link"
            mb={4}
            onClick={() => setStep(step - 1)}
            isDisabled={bundles.length === 0}
          >
            Back
          </Button>
        )}

        {step === 1 && (
          <Stack spacing={3}>
            <Text fontSize="lg" fontWeight="bold">
              Contact Information
            </Text>
            <Input
              placeholder="Email"
              name="email"
              value={contactInfo.email || ""}
              onChange={(e) => handleFormChange(e, setContactInfo)}
              onBlur={() => updateFormValidity()}
              isInvalid={touchedFields.email && errors.email}
              isDisabled={bundles.length === 0}
            />
            {touchedFields.email && errors.email && (
              <Text color="red">{errors.email}</Text>
            )}
            <Input
              placeholder="First Name"
              name="firstName"
              value={contactInfo.firstName || ""}
              onChange={(e) => handleFormChange(e, setContactInfo)}
              onBlur={() => updateFormValidity()}
              isInvalid={touchedFields.firstName && errors.firstName}
              isDisabled={bundles.length === 0}
            />
            {touchedFields.firstName && errors.firstName && (
              <Text color="red">{errors.firstName}</Text>
            )}
            <Input
              placeholder="Last Name"
              name="lastName"
              value={contactInfo.lastName || ""}
              onChange={(e) => handleFormChange(e, setContactInfo)}
              onBlur={() => updateFormValidity()}
              isInvalid={touchedFields.lastName && errors.lastName}
              isDisabled={bundles.length === 0}
            />
            {touchedFields.lastName && errors.lastName && (
              <Text color="red">{errors.lastName}</Text>
            )}
            <Input
              placeholder="Address"
              name="address"
              value={contactInfo.address || ""}
              onChange={(e) => handleFormChange(e, setContactInfo)}
              onBlur={() => updateFormValidity()}
              isInvalid={touchedFields.address && errors.address}
              isDisabled={bundles.length === 0}
            />
            {touchedFields.address && errors.address && (
              <Text color="red">{errors.address}</Text>
            )}
            <Input
              placeholder="City"
              name="city"
              value={contactInfo.city || ""}
              onChange={(e) => handleFormChange(e, setContactInfo)}
              onBlur={() => updateFormValidity()}
              isInvalid={touchedFields.city && errors.city}
              isDisabled={bundles.length === 0}
            />
            {touchedFields.city && errors.city && (
              <Text color="red">{errors.city}</Text>
            )}
            <Select
              name="province"
              value={contactInfo.province || ""}
              onChange={(e) => handleFormChange(e, setContactInfo)}
              onBlur={() => updateFormValidity()}
              isInvalid={touchedFields.province && errors.province}
              isDisabled={bundles.length === 0}
            >
              <option value="">Select Province</option>
              <option value="ON">Ontario</option>
              <option value="QC">Quebec</option>
              <option value="BC">British Columbia</option>
              <option value="AB">Alberta</option>
              <option value="MB">Manitoba</option>
              <option value="NB">New Brunswick</option>
              <option value="NL">Newfoundland and Labrador</option>
              <option value="NS">Nova Scotia</option>
              <option value="PE">Prince Edward Island</option>
              <option value="SK">Saskatchewan</option>
              <option value="NT">Northwest Territories</option>
              <option value="NU">Nunavut</option>
              <option value="YT">Yukon</option>
            </Select>
            {touchedFields.province && errors.province && (
              <Text color="red">{errors.province}</Text>
            )}
            <Input
              required
              placeholder="Postal Code"
              name="postalCode"
              value={contactInfo.postalCode || ""}
              onChange={handlePostalCodeChange}
              onBlur={() => updateFormValidity()}
              isInvalid={touchedFields.postalCode && errors.postalCode}
              isDisabled={bundles.length === 0}
            />
            {touchedFields.postalCode && errors.postalCode && (
              <Text color="red">{errors.postalCode}</Text>
            )}
            <Input
              placeholder="Phone Number"
              name="phone"
              value={contactInfo.phone || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                handleFormChange(
                  { target: { name: "phone", value } },
                  setContactInfo
                );
              }}
              onBlur={() => updateFormValidity()}
              isInvalid={touchedFields.phone && errors.phone}
              isDisabled={bundles.length === 0}
            />
            {touchedFields.phone && errors.phone && (
              <Text color="red">{errors.phone}</Text>
            )}
            <Button
              bg="primary"
              _hover={{ bg: "secondary" }}
              color="white"
              onClick={() => setStep(2)}
              isDisabled={!isFormValid || bundles.length === 0}
            >
              Next
            </Button>
          </Stack>
        )}

        {step === 2 && (
          <Stack spacing={3}>
            <Text fontSize="lg" fontWeight="bold">
              Payment Information
            </Text>
            <Input
              placeholder="Cardholder's Name"
              name="cardName"
              value={paymentInfo.cardName || ""}
              onChange={(e) => handleFormChange(e, setPaymentInfo)}
              onBlur={() => updateFormValidity()}
              isInvalid={touchedFields.cardName && errors.cardName}
              isDisabled={bundles.length === 0}
            />
            {touchedFields.cardName && errors.cardName && (
              <Text color="red">{errors.cardName}</Text>
            )}
            <Input
              placeholder="Card Number"
              name="cardNumber"
              value={paymentInfo.cardNumber || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 16);
                handleFormChange(
                  { target: { name: "cardNumber", value } },
                  setPaymentInfo
                );
              }}
              onBlur={() => updateFormValidity()}
              isInvalid={touchedFields.cardNumber && errors.cardNumber}
              isDisabled={bundles.length === 0}
            />
            {touchedFields.cardNumber && errors.cardNumber && (
              <Text color="red">{errors.cardNumber}</Text>
            )}
            <Input
              placeholder="Expiry Date (MM/YY)"
              name="expiry"
              value={paymentInfo.expiry || ""}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length > 2 && value.length <= 4) {
                  value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                }
                handleFormChange(
                  { target: { name: "expiry", value } },
                  setPaymentInfo
                );
              }}
              onBlur={() => updateFormValidity()}
              isInvalid={touchedFields.expiry && errors.expiry}
              isDisabled={bundles.length === 0}
            />
            {touchedFields.expiry && errors.expiry && (
              <Text color="red">{errors.expiry}</Text>
            )}
            <Input
              placeholder="CVV"
              name="cvv"
              value={paymentInfo.cvv || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 3);
                handleFormChange(
                  { target: { name: "cvv", value } },
                  setPaymentInfo
                );
              }}
              onBlur={() => updateFormValidity()}
              isInvalid={touchedFields.cvv && errors.cvv}
              isDisabled={bundles.length === 0}
            />
            {touchedFields.cvv && errors.cvv && (
              <Text color="red">{errors.cvv}</Text>
            )}
            <Button
              bg="primary"
              _hover={{ bg: "secondary" }}
              color="white"
              onClick={() => setStep(3)}
              isDisabled={!isFormValid || bundles.length === 0}
            >
              Next
            </Button>
          </Stack>
        )}

        {step === 3 && (
          <Flex direction="column" align="flex-start">
            <Text fontSize="2xl" mb={4}>
              Order Summary
            </Text>
            {bundles.map((bundle, index) => (
              <Box key={bundle.id} mb={3} w="100%">
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontSize="lg" fontWeight="bold">
                    Bundle #{index + 1}
                  </Text>
                  <Text fontSize="lg" fontWeight="bold">
                    ${bundle.total.toFixed(2)}
                  </Text>
                </Flex>
                <Divider my={3} />
              </Box>
            ))}
            <Flex justify="space-between" w="100%" mb={4}>
              <Text fontSize="xl" fontWeight="bold">
                Grand Total:
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                ${totalAmount.toFixed(2)}
              </Text>
            </Flex>
            <Button
              bg="primary"
              _hover={{ bg: "secondary" }}
              color="white"
              onClick={handlePlaceOrder}
              mt={5}
              isDisabled={!isFormValid}
            >
              Place Order
            </Button>
          </Flex>
        )}

        {step === 4 && (
          <Box textAlign="center">
            <Text fontSize="lg" fontWeight="bold">
              Thank you for shopping with us!
            </Text>
            <Text>
              Your order has been placed. An email with the order and shipping
              details has been sent to your email address.
            </Text>
            <Button
              mt={4}
              bg="primary"
              _hover={{ bg: "secondary" }}
              color="white"
              onClick={() => navigate("/")}
            >
              Return to Home
            </Button>
          </Box>
        )}
        <Progress
          value={(step / 4) * 100}
          size="sm"
          colorScheme="blue"
          mt={4}
        />
      </Box>
    </Flex>
  );
};

export default Bag;
