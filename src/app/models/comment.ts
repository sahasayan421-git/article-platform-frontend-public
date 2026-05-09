export interface Author {
  id: string;
  username: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: Author;
  replies: Comment[];
}