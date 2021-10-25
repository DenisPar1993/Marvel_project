import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useState,useEffect } from 'react';
import './singleComic.scss';
import useMarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/errorMessage'
import xMen from '../../resources/img/x-men.png';
import AppBanner from '../appBanner/AppBanner';

const SingleComic = ({data}) => {
    
    const {title,description,pageCount,thumbnail,language,price,id}= data;

    return(
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comic books`}
                />
                <title>{title} </title>
            </Helmet>
        <img src={thumbnail} alt={title} className="single-comic__img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{title}</h2>
            <p className="single-comic__descr">{description}</p>
            <p className="single-comic__descr">{pageCount}</p>
            <p className="single-comic__descr">{language}</p>
            <div className="single-comic__price">{price}</div>
        </div>
        <Link to="/comics" className="single-comic__back">Back to all</Link>
    </div>
    )
}

// const View = ({comic})=>{
//     const {title,description,pageCount,thumbnail,language,price,id}= comic;

//     return(
//         <div className="single-comic">
//         <img src={thumbnail} alt={title} className="single-comic__img"/>
//         <div className="single-comic__info">
//             <h2 className="single-comic__name">{title}</h2>
//             <p className="single-comic__descr">{description}</p>
//             <p className="single-comic__descr">{pageCount}</p>
//             <p className="single-comic__descr">{language}</p>
//             <div className="single-comic__price">{price}</div>
//         </div>
//         <Link to="/comics" className="single-comic__back">Back to all</Link>
//     </div>
//     )



export default SingleComic;