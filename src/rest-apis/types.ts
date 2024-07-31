// types.ts

import { Action } from 'redux';
import { ArticleReducerState } from './reducers/types';

// Define the shape of your entire Redux state
export interface RootState {
  newsListing: ArticleReducerState;
}

// Define your action types
export interface RootAction extends Action {
  type: string;
  // Add any specific action payloads or metadata here
}

// Example of a more specific action type
export interface SomeSpecificAction extends Action {
  type: 'SOME_ACTION_TYPE';
  payload: any; // Replace `any` with the actual type of your payload
}
