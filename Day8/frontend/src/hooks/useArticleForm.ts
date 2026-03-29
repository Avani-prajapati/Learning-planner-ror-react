import { useState } from "react";

export interface FormState {
  title: string;
  body: string;
  articleType: "text" | "video";
  videoFile: File | null;
  selectedTagIds: string[];
}

const initialState: FormState = {
  title: "",
  body: "",
  articleType: "text",
  videoFile: null,
  selectedTagIds: [],
};

export function useArticleForm() {
  const [formState, setFormState] = useState<FormState>(initialState);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]):void =>
    setFormState((prev) => ({ ...prev, [key]: value }));

  const toggleTag = (id: string):void =>
    setFormState((prev) => ({
      ...prev,
      selectedTagIds: prev.selectedTagIds.includes(id)
        ? prev.selectedTagIds.filter((t) => t !== id)
        : [...prev.selectedTagIds, id],
    }));

  const setArticleType = (type: "text" | "video"):void =>
    setFormState((prev) => ({
      ...prev,
      articleType: type,
      body: type === "video" ? "" : prev.body,
      videoFile: type === "text" ? null : prev.videoFile,
    }));

  const reset = ():void => setFormState(initialState);

  return { formState, setField, toggleTag, setArticleType, reset };
}
