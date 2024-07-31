import {
    START_FETCHING_NEWS_LISTING,
    SUCCESS_FETCHING_NEWS_LISTING,
    ERROR_FETCHING_NEWS_LISTING,
} from "../actions/newsListing";
import { FetchNewsListingAction } from "../actions/types";
import { ArticleReducerState } from "./types";



const initState = {
    newsList: {
        isLoading: false,
        isError: false,
        data: [],
    },
};



export default function newsListing(prevState: ArticleReducerState = initState, action: FetchNewsListingAction) : ArticleReducerState{
    switch (action.type) {
        case START_FETCHING_NEWS_LISTING: {
            return {
                ...prevState,
                newsList: {
                    ...prevState.newsList,
                    isLoading: true,
                    isError: false,
                    data: [],
                },
            };
        }
        case SUCCESS_FETCHING_NEWS_LISTING: {
            const { data } = action;
            return {
                ...prevState,
                newsList: {
                    ...prevState.newsList,
                    isLoading: false,
                    isError: false,
                    data,
                },
            };
        }
        case ERROR_FETCHING_NEWS_LISTING: {
            const { errorMessage = "" } = action;
            return {
                ...prevState,
                newsList: {
                    ...prevState.newsList,
                    isLoading: false,
                    isError: true,
                    data: [],
                    errorMessage,
                },
            };
        }
        default:
            return prevState;
    }
}
