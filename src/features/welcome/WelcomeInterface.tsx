import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const WelcomeInterface = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
    });
  };

  const handleSignup = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
      },
      appState: {
        returnTo: "/dashboard",
      },
    });
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
      paddingInline={2}
    >
      <Container maxW="lg">
        <Box
          bg="white"
          p={{ base: 6, md: 10 }}
          rounded="lg"
          shadow="md"
          textAlign="center"
        >
          <Stack gap={6}>
            <Heading size="lg">Welcome to the Book Admin Dashboard</Heading>

            <Text color="gray.600">
              Manage your book collection in one place. Create, update, and
              organize books securely using a modern full-stack application.
            </Text>

            {!isAuthenticated && (
              <Stack
                direction={{ base: "column", sm: "row" }}
                gap={4}
                justify="center"
              >
                <Button paddingInline={5} onClick={handleLogin}>
                  Log In
                </Button>

                <Button
                  variant="outline"
                  paddingInline={5}
                  onClick={handleSignup}
                >
                  Sign Up
                </Button>
              </Stack>
            )}
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};

export default WelcomeInterface;
