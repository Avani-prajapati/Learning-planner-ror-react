import { VStack, Spinner, Text } from "@chakra-ui/react";

function LoadingState() {
  return (
    <VStack gap={4} py={20}>
      <Spinner size="xl" width="4px" color="blue.500" />
      <Text className="text-gray-500">Loading Articles...</Text>
    </VStack>
  );
}

export default LoadingState;
