import { Box, Text } from "@chakra-ui/react";

function ErrorState({ message }: { message: string }) {
  return (
    <Box className="bg-red-50 border border-red-200 rounded-xl p-6 text-center shadow-sm">
      <Text color="red.500" fontWeight="medium">
        {message}
      </Text>
    </Box>
  );
}

export default ErrorState;
