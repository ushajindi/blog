export interface UIArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    image: string;
    following: boolean;
  };
}

export interface UIArticlesSliceState extends UIArticlesResponse {
  status: 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
  article?: UIArticle;
}

export interface UIArticlesResponse {
  articles: UIArticle[];
  articlesCount: number;
}
