import {
  Box,
  Container,
  HStack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

interface HeaderProps {
  onLogin: () => void;
  onSignup: () => void;
}

function Header({ onLogin, onSignup }: HeaderProps) {
  const { isAuthenticated, onLogout, user } = useAuth();
  return (
    <Box className="bg-white/80 backdrop-blur-md border-b border-gray-200">
      <Container maxW="6xl" py={6}>
        <HStack align="start" className="justify-between">
          <Heading size="lg" className="text-gray-800">
            Blogger
          </Heading>

          <HStack gap={3}>
            {isAuthenticated ? (
              <>
                <Text fontSize="sm" color="gray.600">
                  {user?.name}
                </Text>
                <Button variant="outline" colorScheme="red" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button colorScheme="blue" onClick={onLogin}>
                  Login
                </Button>
                <Button colorScheme="blue" onClick={onSignup}>
                  Sign up
                </Button>
              </>
            )}
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}

export default Header;
