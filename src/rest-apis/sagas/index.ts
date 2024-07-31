import { all, AllEffect } from 'redux-saga/effects';
import { fetchNewsListingWatcher } from './newsListing';

export default function* rootSaga(): Generator<AllEffect<unknown>, void, unknown> {
  yield all([
    fetchNewsListingWatcher()
  ]);
}
