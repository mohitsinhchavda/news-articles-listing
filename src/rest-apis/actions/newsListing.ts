import { TakeableChannel } from "redux-saga";

export const START_FETCHING_NEWS_LISTING = "START_FETCHING_NEWS_LISTING" as unknown as TakeableChannel<unknown>;
export const SUCCESS_FETCHING_NEWS_LISTING : string = "SUCCESS_FETCHING_NEWS_LISTING";
export const ERROR_FETCHING_NEWS_LISTING : string = "ERROR_FETCHING_NEWS_LISTING";
