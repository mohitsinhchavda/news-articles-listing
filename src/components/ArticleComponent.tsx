
import React from 'react';
import { Article } from '@/rest-apis/reducers/types';
import { baseURL } from "../rest-apis/api";
import DOMPurify from "dompurify";
import clsx from 'clsx';
import { formatDateForListing } from '@/utils';


interface ArticleProps {
    article: Article
}


const ArticleComponent = ({ article }: ArticleProps) => {
    return (
        <div key={article.title} className='article-container'>
            <div className='article-title-image-container'>
                <div className='center'>
                    <img src={`${baseURL}${article.image}`} alt={article.title} className='article-image' />
                </div>
                <div className='date-title-container'>
                    <div className='article-date-source-container'>
                        <div className={clsx('article-date', {
                            'no-date-text grayColor-50': !formatDateForListing(article.date)
                        })}>
                            {formatDateForListing(article.date) || "No date available"}
                        </div>
                        <div className='article-source'>
                            {article.source}
                        </div>
                    </div>
                    <h3 className='artilce-title' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.title) }} />
                </div>
            </div>
            <div className='article-body' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.body) }} />
            <h6 className='article-author'>{article.author}</h6>
            <hr className='hr-line' />
        </div>
    );
};


export default ArticleComponent;