import { TypedUseSelectorHook, useSelector } from "react-redux";
import { NewsListState, RootState } from "../reducers/types";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;


// Create a custom hook to select `newsList` state directoly from reducer
export const useNewsListingSelector = (): NewsListState => {
  return useTypedSelector(({newsListing : {newsList}}) => newsList);
};