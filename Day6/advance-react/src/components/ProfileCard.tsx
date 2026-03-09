import {
  Card,
  Avatar,
  Heading,
  Text,
  Badge,
  VStack,
  HStack
} from "@chakra-ui/react";

type ProfileCardProps = {
  name: string;
  role: string;
  skills: string[];
};

const ProfileCard = ({ name, role, skills }: ProfileCardProps) => {
  return (
    <Card.Root maxW="sm" boxShadow="lg" borderRadius="lg">
      
      <Card.Header>
        <HStack>
          <Avatar.Root>
            <Avatar.Fallback name={name} />
          </Avatar.Root>

          <VStack align="start" gap={0}>
            <Heading size="sm">{name}</Heading>
            <Text fontSize="sm" color="gray.500">
              {role}
            </Text>
          </VStack>
        </HStack>
      </Card.Header>

      <Card.Body>
        <HStack>
          {skills.map((skill, index) => (
            <Badge key={index} colorScheme="blue">
              {skill}
            </Badge>
          ))}
        </HStack>
      </Card.Body>


    </Card.Root>
  );
};

export default ProfileCard;