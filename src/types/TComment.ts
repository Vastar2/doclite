export interface TComment {
  id: string;
  content: string;
  replies: Comment[];
  createdAt: Date;
}
