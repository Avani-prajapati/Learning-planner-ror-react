export interface Comment {
  id: string;
  body: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  comments: Comment[];
}
