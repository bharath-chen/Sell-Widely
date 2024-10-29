export interface Blog {
  blog_id: string;
  title: string;
  content: string;
  author: string;
  published_date: string;
  status: string;
  image_url: string;
  category?: string;
}
