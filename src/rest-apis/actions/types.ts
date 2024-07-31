import { Article } from "../reducers/types";

export interface FetchNewsListingAction {
    type: string;
    errorMessage: string;
    data: Article[];
}