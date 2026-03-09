import { Button, HStack } from "@chakra-ui/react";

const Demo = () => {
  return (
    <HStack gap={4}>
      <Button colorScheme="teal">Click me</Button>
      <Button colorScheme="blue">Click me</Button>
    </HStack>
  );
};

export default Demo;