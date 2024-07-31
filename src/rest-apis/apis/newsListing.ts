import { ApiResponse, get } from "../api";
import { Article } from "../reducers/types";

export type ArticleAPIResponse = ApiResponse<Article[]>;



export const fetchNewsListing = async (): Promise<ArticleAPIResponse> => {
    const res = await get("/api/v1/news");
    return res as ArticleAPIResponse;
};