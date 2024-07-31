import { takeLatest, call, put, CallEffect} from "redux-saga/effects";
import {
    START_FETCHING_NEWS_LISTING,
    SUCCESS_FETCHING_NEWS_LISTING,
    ERROR_FETCHING_NEWS_LISTING,
} from "../actions/newsListing";
import {
  ArticleAPIResponse,
  fetchNewsListing
} from "../apis/newsListing";

export function* fetchNewsListingWatcher() {
  yield takeLatest(START_FETCHING_NEWS_LISTING, fetchNewsListingWorker);
}

function* fetchNewsListingWorker(): Generator {
  const response = (yield call(fetchNewsListing)) as ArticleAPIResponse;
  if (response.status) {
    yield put({
      type: SUCCESS_FETCHING_NEWS_LISTING,
      data: response.data,
    });
  } else {
    const errorMessage = response.unauthenticated ? "You do not have permissions!" : response?.errorMessage;
    yield put({
      type: ERROR_FETCHING_NEWS_LISTING,
      errorMessage,
    });
  }
}
