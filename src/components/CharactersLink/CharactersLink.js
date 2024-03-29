import './CharactersLink.scss';
import { Link } from 'react-router-dom';

const CharactersLink =({data})=>{
    const {title,description,thumbnail}= data;
return(
    <div className="single-comic">
        <img src={thumbnail} alt={title} className="single-comic__img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{title}</h2>
            <p className="single-comic__descr">{description}</p>
            
        </div>
        <Link to="/" className="single-comic__back">Back to all</Link>
    </div>
)
}

export default CharactersLink