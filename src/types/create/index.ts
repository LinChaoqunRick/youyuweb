export interface postData {
  title: string,
  content: string,
  categoryId: number | null,
  tags: string[],
  thumbnail: string[],
  summary: string,
  createType: string,
  originalLink: string
}
