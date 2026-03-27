import { type FormState } from "../hooks/useArticleForm";

export const buildVariables = (form: FormState) => ({
  title: form.title.trim(),
  body: form.articleType === "text" ? form.body.trim() : null,
  status: "public",
  articleType: form.articleType,
  tagIds: form.selectedTagIds,
  video: form.articleType === "video" ? form.videoFile : null,
});

export const validateForm = (form: FormState): string | null => {
  if (!form.title.trim()) return "Title is required.";
  if (form.articleType === "text" && !form.body.trim())
    return "Body is required for text articles.";
  if (form.articleType === "video" && !form.videoFile)
    return "Video file is required for video articles.";
  return null;
};