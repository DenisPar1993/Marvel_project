import { useState, useEffect, useRef,useMemo } from 'react';
import './charList.scss';
import useMarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

const SetContent = (process,newItemLoading,Component)=>{
    switch(process){
        case 'waiting':
            return <Spinner/>
            break;
        case 'loading':
            return newItemLoading?<Component/>: <Spinner />
            break;
        case 'confirmed':
            return <Component />
            break;
        case 'error':
            return <ErrorMessage />
            break;  
        default:
            throw new Error('Unexpected process state')          
        
    }
}
const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(9);
    const [charEnded, setCharEnded] = useState(false)

    const {  getAllCharacters, process, setProcess } = useMarvelService();
    useEffect(() => {
        onRequest(offset, true)
    }, [])


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }
    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }
        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const arrRef = useRef([])

    const focusOnItem = (id) => {
        arrRef.current.forEach(item => item.classList.remove('char__item_selected'));
        arrRef.current[id].classList.add('char__item_selected');
        arrRef.current[id].focus();
    }
    
    const cardRend = charList.map((item, i) => {
        let imgStyle = { 'objectFit': 'cover' };
        if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = { 'objectFit': 'unset' };
        }
        return (
            
                <TransitionGroup component={null}>
                    <CSSTransition key={item.id} classNames="char__item"
                        timeout={2000}>
                        <li
                            className="char__item"
                            tabIndex={0}
                            ref={el => arrRef.current[i] = el}
                            key={item.id}
                            onClick={() => {
                                props.onSelectedChar(item.id)
                                focusOnItem(i)
                            }
                            }
                            onKeyPress={(e) => {
                                if (e.key === ' ' || e.key === "Enter") {
                                    props.onSelectedChar(item.id);
                                    focusOnItem(i);
                                }
                            }}>
                            <img style={imgStyle} src={item.thumbnail} alt="abyss" />
                            <div className="char__name">{item.name}</div>
                        </li>
                    </CSSTransition>
                </TransitionGroup>
           
        )
    })
    const element=useMemo(()=>{
        return  SetContent(process,newItemLoading,()=>cardRend)
    },[process])





    return (

        <div className="char__list">
          <ul className="char__grid">  
            {element}
            </ul>
            <button
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                className="button button__main button__long"
            >
                <div className="inner">load more</div>
            </button>
        </div>

    )
}



CharList.propTypes = {
    onSelectedChar: PropTypes.func
}

export default CharList;