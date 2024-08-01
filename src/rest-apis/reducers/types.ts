export type Article = Readonly<{
    title: string;
    url: string;
    image: string;
    date: string;
    body: string;
    author: string;
    source: string;
}>;

export interface NewsListState {
    isLoading: boolean;
    isError: boolean;
    data: Article[];
    lastSynced?: string;
    errorMessage?: string | null;
    isNodata: boolean;
};

export type ArticleReducerState = Readonly<{
    newsList: NewsListState;
}>;

export type RootState = Readonly<{
    newsListing: ArticleReducerState;
}>;

