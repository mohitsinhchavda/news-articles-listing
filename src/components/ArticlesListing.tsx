import React from 'react';
import { Article, NewsListState } from '../rest-apis/reducers/types';
import ArticleComponent from "./ArticleComponent";
import NoDataComponent from "./common/NoDataComponent";

interface ArticlesListingProps extends NewsListState {
    isDataSetInLocalStateAfterApplyingFilters: boolean;
}

const ArticlesListing = ({ isDataSetInLocalStateAfterApplyingFilters, data, isLoading, isError, errorMessage, isNodata  }: ArticlesListingProps) => {
    return (
        isLoading 
            ?
            <div className='loading-container'>
                {
                    Array.from([1,2,3,4]).map((item) => {
                        return (
                            <div className='skeleton-loader' key={item}/>
                        )
                    })
                }
            </div>
            :
            isError
                ?
                <h2 className='error-text'>{errorMessage || "Something went wrong!"}</h2>
                :
                (isNodata) || (isDataSetInLocalStateAfterApplyingFilters && data?.length === 0)
                ?
                <NoDataComponent />
                :
                <div className='article-component-container'>
                    {
                        data.map((article: Article) => {
                            return (
                                <ArticleComponent
                                    article={article}
                                    key={article.title}
                                />
                            )
                        })
                    }
                </div>
    );
};


export default ArticlesListing;