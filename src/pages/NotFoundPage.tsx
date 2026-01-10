import { Box, Button, Heading, Text, Flex, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// To be displayed if page is not found
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
      paddingInline={2}
    >
      <Box bg="white" p={8} rounded="lg" shadow="md" textAlign="center">
        <Stack gap={4} align="center">
          <Heading size="xl" color="red.500">
            404
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Oops! The page you are looking for does not exist.
          </Text>
          <Button padding={5} onClick={() => navigate("/")}>
            Go Back Home
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default NotFoundPage;
