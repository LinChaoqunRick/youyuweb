interface FavoritesType {
  id?: string;
  userId?: number;
  name?: string;
  postIds?: string;
  cover?: string;
  open?: number;
  isTop?: number;
  likeCount?: number;
  createTime?: string;
  updateTime?: string;
  previewPosts?: [];
}

export type {FavoritesType};
