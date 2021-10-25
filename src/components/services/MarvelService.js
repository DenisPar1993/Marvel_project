import {useHttp} from '../../hooks/http.hook'


const useMarvelService=()=>{
    const {loading, request,error,clearError}= useHttp();
    const _apiKey ='apikey=06edf9843eabdb929383535df071b156';
    const _apiBase='https://gateway.marvel.com:443/v1/public/';
    const _baseOffset = 210;
    const getAllCharacters = async (offset = _baseOffset)=>{
        const res= await  request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
         return res.data.results.map(_transformCharacter)  
    }
    const getCharacters = async (id)=>{
        const res= await request(`${_apiBase}characters/${id}?&${_apiKey}`)
        return _transformCharacter(res.data.results[0]);
    }
    const getNameChar = async (name)=>{
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}
`)
    return res.data.results.map(_transformCharacter);
    }
    const getAllComics = async(offset=0)=>{
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return  res.data.results.map(_transformComics)  
    }
    const getComics = async(id)=>{
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }
    const  _transformCharacter=(char)=>{
        
        return {
                    id:char.id,  
                    name: char.name,
                    description: char.description? `${char.description.slice(0,210)}...`:'Данных об этом персонаже нет',
                    thumbnail: char.thumbnail.path+'.'+char.thumbnail.extension,
                    homepage: char.urls[0].url,
                    wiki: char.urls[0].url,
                    comics: char.comics.items
        }
    }
    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

    return {loading, error, getAllCharacters,getCharacters,clearError,getAllComics,getComics,getNameChar}
}
export default useMarvelService;