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
  Button,
  Flex
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const SignIn = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <Stack spacing={6} maxW="md" mx="auto" mt="8" fontFamily="CaviarDreams">
      <Flex align="center" justify="center" gap={2}>
        <Heading as="h2" size="lg" fontFamily="CaviarDreams">
          Sign in to
        </Heading>
        <Image src="/images/logo.svg" alt="Logo" height="50px" />
      </Flex>

      <Card
        p="8"
        boxShadow="xl"
        bg={theme.colors.accent}
        color={theme.colors.text}
      >
        <Stack spacing={6}>
          <Input
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={handleEmailChange}
            bg={theme.colors.background}
            _placeholder={{ color: theme.colors.textLight }}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            bg={theme.colors.background}
            _placeholder={{ color: theme.colors.textLight }}
          />
          <Button
            bg={theme.colors.secondary}
            color={"white"}
            _hover={{
              bg: theme.colors.tertiary,
              boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)",
            }}
            boxShadow="inset 0 0 5px rgba(0, 0, 0, 0.3)"
            size="md"
            isDisabled={!email || !password}
            onClick={() => navigate("/")}
          >
            Sign In
          </Button>
          <Text textAlign="left">
            Don't have an account?{" "}
            <Link as={RouterLink} to="/signUp" color="blue.500">
              Click here to create an account.
            </Link>
          </Text>
        </Stack>
      </Card>
    </Stack>
  );
};

export default SignIn;
