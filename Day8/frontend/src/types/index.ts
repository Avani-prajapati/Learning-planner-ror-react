export interface User {
  id: string;
  name: string;
  email: string;
  articles: Article[];
  profile?: Profile | null;
}

export interface Profile {
  id: string;
  bio?: string | null;
  avatarUrl?: string | null;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Comment {
  id: string;
  body: string;
  status: string;
  createdAt: string;
  user: User;
}

export interface Article {
    id: string;
    title: string;
    body: string | null;
    status: string;
    articleType: string;
    videoUrl: string | null;
    createdAt: string;
    user: User;
    comments: Comment[];
    tags: Tag[];
}
