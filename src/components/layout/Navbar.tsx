import { Box, Flex, Text, Button, HStack, Avatar } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLogOut, FiUser } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth0();

  const displayName = user?.name || user?.email || "User";

  return (
    <Box
      as="nav"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      px={{ base: 4, md: 8 }}
      py={3}
    >
      <Flex align="center" justify="space-between">
        {/* Brand */}
        <Text fontSize="lg" fontWeight="bold">
          BookAdmin
        </Text>

        {/* User section */}
        <HStack gap={4}>
          <HStack gap={2} maxW="220px">
            <Avatar.Root size="sm">
              {user?.picture ? (
                <Avatar.Image src={user.picture} />
              ) : (
                <Avatar.Fallback>
                  <FiUser />
                </Avatar.Fallback>
              )}
            </Avatar.Root>

            <Text
              fontSize="sm"
              color="gray.700"
              maxW="140px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              title={displayName}
              display={{ base: "none", md: "block" }}
            >
              {displayName}
            </Text>
          </HStack>

          <Button
            size="sm"
            variant="outline"
            paddingInline={2}
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: window.location.origin,
                },
              })
            }
          >
            <FiLogOut />
            Logout
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
