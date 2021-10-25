import './comicsList.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../services/MarvelService'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const ComicsList = () => {
    const [comicsList, setComicsList]=useState([]);
    const [newItemLoading,setNewItemLoading] = useState(false);
    const [offset, setOffset]= useState(9);
    const [comicsEnded, setComicsEnded]= useState(false)
    const {loading,error,getAllComics}=useMarvelService();
    const onRequest =(offset,initial)=>{
        initial?setNewItemLoading(false):setNewItemLoading(true)
        getAllComics(offset)
        .then(onComicsListLoaded)
       
    }
    useEffect(()=>{
        onRequest(offset,true)

    },[])
    const onComicsListLoaded = (newComicsList)=>{
        let ended = false;
        if(newComicsList.length<8){
            ended=true
        }
        setComicsList(comicsList=> [...comicsList,...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset=>offset+8);
        setComicsEnded(charEnded=> ended);
    }

    const rendContent = comicsList.map((item,i)=>{
                return( <li 
                className="comics__item"
                key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )})
        
 
    
    
    
    const errorMessage = error? <ErrorMessage />:null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    
    return (
        
        <div className="comics__list">
            <ul className="comics__grid">
                {errorMessage}
                {spinner}
                {rendContent}
            </ul>
            <button 
            disabled={newItemLoading} 
            style={{'display' : comicsEnded ? 'none' : 'block'}}
            className="button button__main button__long"
            onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;