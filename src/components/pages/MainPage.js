import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import { Helmet } from "react-helmet";

import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorMessage from "../errorMessage/errorMessage";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import CharForm from "../charForm/charForm";

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onSelectedChar = (id) => {
        setSelectedChar(id)
    }
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information </title>
            </Helmet>
            {/* <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary> */}
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onSelectedChar={onSelectedChar} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharForm />
                    </ErrorBoundary>
                </div>


            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}
export default MainPage;