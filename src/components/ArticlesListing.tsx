import React from 'react';
import { Article } from '../rest-apis/reducers/types';
import ArticleComponent from "./ArticleComponent";
import { Oval } from 'react-loader-spinner';
import NoDataComponent from "./common/NoDataComponent";


interface ArticlesListingProps {
    data: Article[];
    isLoading: boolean;
    isError: boolean;
    errorMessage?: string;
}


const ArticlesListing = ({ data, isLoading, isError, errorMessage }: ArticlesListingProps) => {
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
                <h2 className='error-text'>{errorMessage}</h2>
                :
                data.length === 0
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