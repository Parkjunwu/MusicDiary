export type BoardFooterComponentProps = {
  id: number;
  // userId: number;
  user: {
    id: number,
    userName: string,
    avatar: string,
  };
  isLiked: boolean;
  likes: number;
  commentNumber: number;
};