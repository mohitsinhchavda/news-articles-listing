import { Action } from 'redux';
import { ArticleReducerState } from './reducers/types';

export interface RootState {
  newsListing: ArticleReducerState;
}

export interface RootAction extends Action {
  type: string;
}