export interface Comment {
    id: string;
    body: string;
    createdAt: string;
  }
  
  export interface Post {
    id: string;
    title: string;
    body: string;
    createdAt: string;
    comments: Comment[];
  }