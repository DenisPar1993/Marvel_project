import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/errorMessage";

const Page404=()=>{
    return(
        <>
        <ErrorMessage />
        <Link style={{'display':'block', 'textAlign ':'center','fontSize':'30px','marginTop':'30px','fontWeight':'bold'}} to="/">Back to Main page</Link>
        </>
    )
}

export default Page404;