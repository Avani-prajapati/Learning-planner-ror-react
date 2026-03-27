import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
  Box,
  Button,
  Input,
  Text,
  Heading,
  VStack,
  HStack,
  Link,
} from "@chakra-ui/react";
import { SIGN_IN, SIGN_UP } from "../graphql/auth/mutations";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  onClose: () => void;
  tabOption: string;
}

interface SignInResponse {
  signIn: {
    token: string;
    user: { id: string; name: string; email: string };
    errors: string[];
  };
}

interface SignUpResponse {
  signUp: {
    token: string;
    user: { id: string; name: string; email: string };
    errors: string[];
  };
}

function AuthModal({ onClose, tabOption }: Props) {
  const { onLogin} = useAuth();
  const [tab, setTab] = useState<String>(tabOption);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [signIn, { loading: signInLoading }] = useMutation<SignInResponse>(
    SIGN_IN,
    {
      onCompleted: (data) => {
        if (data.signIn.errors.length > 0) {
          setError(data.signIn.errors[0]);
        } else {
          onLogin(data.signIn.token, data.signIn.user);
          onClose();
        }
      },
      onError: (err) => setError(err.message),
    },
  );

  const [signUp, { loading: signUpLoading }] = useMutation<SignUpResponse>(
    SIGN_UP,
    {
      onCompleted: (data) => {
        if (data.signUp.errors.length > 0) {
          setError(data.signUp.errors[0]);
        } else {
          onLogin(data.signUp.token, data.signUp.user);
          onClose();
        }
      },
      onError: (err) => setError(err.message),
    },
  );

  const handleSignIn = () => {
    if (!email || !password) {
      setError("All fields required.");
      return;
    }
    setError("");
    signIn({ variables: { email, password } });
  };

  const handleSignUp = () => {
    if (!name || !signUpEmail || !signUpPassword || !passwordConfirmation) {
      setError("All fields required.");
      return;
    }
    setError("");
    signUp({
      variables: {
        name,
        email: signUpEmail,
        password: signUpPassword,
        passwordConfirmation,
      },
    });
  };

  return (
    <Box
      position="fixed"
      inset={0}
      bg="blackAlpha.600"
      zIndex={50}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
    >
      <Box
        bg="white"
        borderRadius="2xl"
        p={8}
        w="100%"
        maxW="md"
        onClick={(e) => e.stopPropagation()}
      >
        <Heading size="md" mb={6} textAlign="center">
          {tab === "signin" ? "Welcome Back" : "Create Account"}
        </Heading>

        {tab === "signin" ? (
          <VStack gap={4} align="stretch">
            <Input
              placeholder="Email"
              type="email"
              borderRadius="xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              borderRadius="xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Text color="red.500" fontSize="sm">
                {error}
              </Text>
            )}
            <Button
              colorScheme="blue"
              borderRadius="xl"
              onClick={handleSignIn}
              loading={signInLoading}
            >
              Sign In
            </Button>
            <HStack justify={"center"} mt={2}>
              <Text fontSize={"sm"} color={"gray.600"}>
                Don't have an account ?
              </Text>
              <Link
                color={"blue.500"}
                fontWeight={"medium"}
                onClick={() => {
                  setTab("signup");
                  setError("");
                }}
              >
                Sign up
              </Link>
            </HStack>
          </VStack>
        ) : (
          <VStack gap={4} align="stretch">
            <Input
              placeholder="Name"
              borderRadius="xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="email"
              borderRadius="xl"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              borderRadius="xl"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />
            <Input
              placeholder="Confirm Password"
              type="password"
              borderRadius="xl"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            {error && (
              <Text color="red.500" fontSize="sm">
                {error}
              </Text>
            )}
            <Button
              colorScheme="blue"
              borderRadius="xl"
              onClick={handleSignUp}
              loading={signUpLoading}
            >
              Create Account
            </Button>
            <HStack justify={"center"} mt={2}>
              <Text fontSize={"sm"} color={"gray.600"}>
                Already have an account ?
              </Text>
              <Link
                color={"blue.500"}
                fontWeight={"medium"}
                onClick={() => {
                  setTab("signin");
                  setError("");
                }}
              >
                Login
              </Link>
            </HStack>
          </VStack>
        )}
      </Box>
    </Box>
  );
}

export default AuthModal;
