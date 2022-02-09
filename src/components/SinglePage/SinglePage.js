import { useParams, Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../services/MarvelService';
import SetContent from '../../utils/setContent';


const SinglePage =({Component, dataType})=>{
    const {id}=useParams();
    const [data, setData]= useState(null)
    const {getCharacters,getComics,clearError,process, setProcess} = useMarvelService();
    useEffect(()=>{
        onUpdateList()
    },[id])
    const onUpdateList = () => {
        clearError();
        switch (dataType){
            case 'comic':
                getComics(id).then(onDataListLoaded).then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacters(id).then(onDataListLoaded).then(() => setProcess('confirmed'));
                break;    
        }
    }
    const onDataListLoaded = (data) => {
        setData(data)
    }
    return(
        <>
        <AppBanner/>
        {SetContent(process,data,Component)}
        </>          
    )
}
export default SinglePage;