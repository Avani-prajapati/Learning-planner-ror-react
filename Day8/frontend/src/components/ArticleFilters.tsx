import { HStack, Button, Select, createListCollection } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

const articleTypeCollection = createListCollection({
  items: [
    { value: "text", label: "Text Only" },
    { value: "video", label: "Video Only" },
  ],
});

interface ArticleFiltersProps {
  tags: { id: string; name: string }[];
  selectedTagId: string | null;
  selectedArticleType: string | null;
  isMyView: boolean;
  onTagChange: (tagId: string | null) => void;
  onTypeChange: (type: string | null) => void;
  onToggleMyArticles: () => void;
}

function ArticleFilters({
  tags,
  selectedTagId,
  selectedArticleType,
  isMyView,
  onTagChange,
  onTypeChange,
  onToggleMyArticles,
}: ArticleFiltersProps) {
  const { isAuthenticated } = useAuth();

  return (
    <HStack className="justify-between" pb={3}>
      <HStack gap={2} flexWrap="wrap">
        <Button
          size="sm"
          borderRadius="full"
          variant={!selectedTagId && !isMyView ? "solid" : "outline"}
          colorPalette={!selectedTagId && !isMyView ? "blue" : "gray"}
          onClick={() => onTagChange(null)}
        >
          All
        </Button>

        {tags.map((tag) => (
          <Button
            key={tag.id}
            size="sm"
            borderRadius="full"
            variant={
              selectedTagId === tag.id && !isMyView ? "solid" : "outline"
            }
            colorPalette={selectedTagId === tag.id ? "blue" : "gray"}
            onClick={() => onTagChange(tag.id)}
          >
            {tag.name}
          </Button>
        ))}

        {isAuthenticated && (
          <Button
            size="sm"
            borderRadius="full"
            variant={isMyView ? "solid" : "outline"}
            colorPalette={isMyView ? "blue" : "gray"}
            onClick={onToggleMyArticles}
          >
            My Articles
          </Button>
        )}

        <Select.Root
          collection={articleTypeCollection}
          value={selectedArticleType ? [selectedArticleType] : []}
          onValueChange={(e) => onTypeChange(e.value[0] || null)}
          size="sm"
          width="220px"
        >
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="All Types" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
              <Select.ClearTrigger />
            </Select.IndicatorGroup>
          </Select.Control>

          <Select.Positioner>
            <Select.Content>
              {articleTypeCollection.items.map((item) => (
                <Select.Item key={item.value} item={item.value}>
                  {item.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </HStack>
    </HStack>
  );
}

export default ArticleFilters;
