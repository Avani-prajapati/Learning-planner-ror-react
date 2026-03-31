export const mockTextArticle = {
  id: "1",
  title: "Test Article",
  body: "This is the article body.",
  articleType: "text",
  videoUrl: null,
  comments: [],
};

export const mockVideoArticle = {
  id: "2",
  title: "Video Article",
  body: null,
  articleType: "video",
  videoUrl: "https://cdn.example.com/video.mp4",
  comments: [],
};

export const mockComments = [
  { id: "c1", body: "First comment", user: { name: "Alice" } },
  { id: "c2", body: "Second comment", user: { name: "Bob" } },
];
