export interface postData {
  id: number | null,
  title: string,
  content: string,
  categoryId: number | null,
  tags: string[] | string,
  thumbnail: string[],
  summary: string,
  createType: string,
  originalLink: string,
  userId: number | null,
  columnIds: string | string[] | number[] | null,
  user: object
}
