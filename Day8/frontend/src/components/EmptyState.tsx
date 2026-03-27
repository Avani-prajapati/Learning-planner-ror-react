import { VStack, Text } from "@chakra-ui/react";

interface EmptyStateProps {
  isMyView: boolean;
  selectedArticleType: string | null;
}

function EmptyState({ isMyView, selectedArticleType }: EmptyStateProps) {
  const getMessage = () => {
    if (selectedArticleType) {
      return `No ${
        selectedArticleType === "text" ? "text" : "video"
      } articles available`;
    }

    if (isMyView) {
      return "No your articles available";
    }

    return "No Articles available";
  };

  return (
    <VStack
      gap={4}
      py={20}
      className="bg-white rounded-2xl shadow-sm border border-gray-200"
    >
      <Text className="text-gray-600 font-medium">{getMessage()}</Text>
    </VStack>
  );
}

export default EmptyState;
