import { useState, useEffect, useRef } from 'react';
import './charList.scss';
import useMarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import { CSSTransition,TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(9);
    const [charEnded, setCharEnded] = useState(false)

    const { loading, error, getAllCharacters } = useMarvelService();
    useEffect(() => {
        onRequest(offset, true)
    }, [])


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
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
        )
    })
    // const cardRend = this.renderItem(charList)
    console.log(cardRend);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading || !charList ? <Spinner /> : null;





    return (
        
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    <TransitionGroup component={null}>
                    {cardRend}
                    </TransitionGroup>
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