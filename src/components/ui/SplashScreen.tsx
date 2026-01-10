import { Box, Spinner, Stack, Text, Flex } from "@chakra-ui/react";

const SplashScreen = () => {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box bg="white" p={8} rounded="lg" shadow="md" textAlign="center">
        <Stack gap={4} align="center">
          <Spinner size="xl" />
          <Text fontSize="md" color="gray.600">
            Loading, please wait...
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
};

export default SplashScreen;
