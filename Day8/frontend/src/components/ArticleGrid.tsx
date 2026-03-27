import { Box } from "@chakra-ui/react";
import ArticleCard from "./ArticleCard";
import { type Article } from "../types/index";

function ArticleGrid({ articles }: { articles: Article[] }) {
  return (
    <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Box
          key={article.id}
          className="transform transition duration-300 hover:scale-[1.02]"
        >
          <ArticleCard Article={article} />
        </Box>
      ))}
    </Box>
  );
}

export default ArticleGrid;
