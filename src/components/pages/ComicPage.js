import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner"
import { Helmet } from "react-helmet";



const ComicPage =()=>{


    return(
        <>
        <Helmet>
                <meta
                    name="description"
                    content="Page with comics"
                />
                <title>Comics Page </title>
            </Helmet>
        <AppBanner />  
        <ComicsList />
        </>
    )
}
export default ComicPage;