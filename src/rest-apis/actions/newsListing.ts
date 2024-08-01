import { Action } from 'redux';

export const START_FETCHING_NEWS_LISTING = 'START_FETCHING_NEWS_LISTING';
interface StartFetchingNewsListingAction extends Action<typeof START_FETCHING_NEWS_LISTING> { }
export type NewsListingActions = StartFetchingNewsListingAction;


export const SUCCESS_FETCHING_NEWS_LISTING: string = "SUCCESS_FETCHING_NEWS_LISTING";
export const ERROR_FETCHING_NEWS_LISTING: string = "ERROR_FETCHING_NEWS_LISTING";
