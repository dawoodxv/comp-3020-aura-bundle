import React, { useState } from "react";
import {
  Stack,
  Image,
  Heading,
  Input,
  Link,
  Text,
  Card,
  useTheme,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
  IconButton,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

const SignUp = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e.target.value)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
    } else if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setPasswordError("Passwords do not match.");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
    } else {
      setPasswordError("");
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(e.target.value)) {
      setPhoneError("Phone number must be 10 digits.");
    } else {
      setPhoneError("");
    }
  };

  const isFormValid =
    name &&
    email &&
    password &&
    confirmPassword &&
    phone &&
    password === confirmPassword &&
    !emailError &&
    !phoneError &&
    password.length >= 8;

  return (
    <Stack spacing={6} maxW="md" mx="auto" mt="8" fontFamily="CaviarDreams">
      <Flex align="center" justify="center" gap={2}>
        <Heading as="h2" size="lg" textAlign="center" fontFamily="CaviarDreams">
          Sign up for
        </Heading>
        <Image src="/images/logo.svg" alt="Logo" height="50px" />
      </Flex>

      <Card
        p="8"
        boxShadow="xl"
        bg={theme.colors.accent}
        color={theme.colors.text}
      >
        <Stack spacing={4}>
          <Input
            placeholder="First Name"
            type="text"
            value={name}
            onChange={handleNameChange}
            bg={theme.colors.background}
            _placeholder={{ color: theme.colors.textLight }}
          />
          <Input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            bg={theme.colors.background}
            _placeholder={{ color: theme.colors.textLight }}
          />
          <Input
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={handleEmailChange}
            bg={theme.colors.background}
            _placeholder={{ color: theme.colors.textLight }}
          />
          {emailError && <Text color="red.500">{emailError}</Text>}

          <InputGroup>
            <Input
              data-testid="password-input"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              bg={theme.colors.background}
              _placeholder={{ color: theme.colors.textLight }}
            />
            <InputRightElement width="3rem">
              <IconButton
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                icon={showPassword ? <FiEyeOff /> : <FiEye />}
                aria-label={showPassword ? "Hide password" : "Show password"}
                variant="link"
              />
            </InputRightElement>
          </InputGroup>

          <InputGroup>
            <Input
              data-testid="confirm-password-input"
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              bg={theme.colors.background}
              _placeholder={{ color: theme.colors.textLight }}
            />
            <InputRightElement width="3rem">
              <IconButton
                size="sm"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                variant="link"
              />
            </InputRightElement>
          </InputGroup>
          {passwordError && <Text color="red.500">{passwordError}</Text>}

          <InputGroup>
            <InputLeftAddon>+1</InputLeftAddon>
            <Input
              placeholder="Phone Number"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              bg={theme.colors.background}
              _placeholder={{ color: theme.colors.textLight }}
            />
          </InputGroup>
          {phoneError && <Text color="red.500">{phoneError}</Text>}

          <Button
            size="md"
            isDisabled={!isFormValid}
            onClick={() => navigate("/")}
            bg={theme.colors.secondary}
            color={"white"}
            _hover={{
              bg: theme.colors.tertiary,
              boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)",
            }}
            boxShadow="inset 0 0 5px rgba(0, 0, 0, 0.3)"
          >
              Sign Up
          </Button>

          <Text textAlign="left">
            Already have an account?{" "}
            <Link as={RouterLink} to="/signIn" color="blue.500">
              Click here to sign in.
            </Link>
          </Text>
        </Stack>
      </Card>
    </Stack>
  );
};

export default SignUp;
