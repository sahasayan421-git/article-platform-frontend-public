export interface LikeCountResponse {
  likesCount: number;
}

export interface LikeUser {
  id: string;
  username: string;
  avatarUrl: string | null;
}