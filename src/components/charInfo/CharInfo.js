import { useState, useEffect } from 'react';
import useMarvelService from '../services/MarvelService';
import './charInfo.scss';
import PropTypes from 'prop-types';
import SetContent from '../../utils/setContent';

const CharInfo =(props)=> {
    const [char, setChar]=useState(null);
    
    const {getCharacters,clearError,process,setProcess} = useMarvelService();
    useEffect(()=>{
        onUpdateChar()
    },[props.charId])
    const onUpdateChar = () => {
        const { charId } = props
        if (!charId) {
            return
        }
            clearError();
            getCharacters(charId)
            .then(onCharListLoaded)
            .then(()=>setProcess('confirmed'))
    }
    const onCharListLoaded = (char) => {
        setChar(char)
    }

    
   
        return (
            <div className="char__info">
                {SetContent(process,char,View)}

            </div>
        )
    
    
}
const View = ({ data }) => {
    
    const { name, description, thumbnail, homepage, wiki, comics } = data;
    let imgStyle = {'objectFit' : 'cover'};
    if(thumbnail==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {'objectFit' : 'unset'};
    }
    return (
        <>
            <div className="char__basics">
                <img style={imgStyle} src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length>0?null:'Нет комиксов'}
                {
                   comics.length===''? 
                   <li  className="char__comics-item">
                     Данных нет
                   </li>:
                    comics.map((item, i) => {
                        if(i>9){
                            return
                        }
                        
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
                
            </ul>
        </>
    )
}
CharInfo.propTypes={
    charId:PropTypes.number
}

export default CharInfo;