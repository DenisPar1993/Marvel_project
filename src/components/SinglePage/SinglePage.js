import { useParams, Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../services/MarvelService';


const SinglePage =({Component, dataType})=>{
    const {id}=useParams();
    const [data, setData]= useState(null)
    const {loading,error,getCharacters,getComics,clearError} = useMarvelService();
    useEffect(()=>{
        onUpdateList()
    },[id])
    const onUpdateList = () => {
        clearError();
        switch (dataType){
            case 'comic':
                getComics(id).then(onDataListLoaded);
                break;
            case 'character':
                getCharacters(id).then(onDataListLoaded);
                break;    
        }
    }
    const onDataListLoaded = (data) => {
        setData(data)
    }
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;
    return(
        <>
        <AppBanner/>
        {errorMessage}
        {spinner}
        {content}
        </>          
    )
}
export default SinglePage;