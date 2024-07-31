import React from 'react';
import NewsListingContainer from './containers/ArticleListingContainer';
import { Provider } from "react-redux";
import store from "./rest-apis/store";

export default () => {

  return (
    <Provider store={store}>
      <NewsListingContainer />
    </Provider>
  );
};