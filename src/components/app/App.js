import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";


import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../Page404/Page404'))
const MainPage = lazy(() => import('../pages/MainPage'))
const SingleComic = lazy(() => import('../singleComic/SingleComic'))
const ComicPage = lazy(() => import('../pages/ComicPage'))
const CharactersLink = lazy(()=>import('../CharactersLink/CharactersLink'))
const SinglePage = lazy(()=>import('../SinglePage/SinglePage'))
const App = () => {


    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Switch>
                            <Route exact path="/">
                                <MainPage />

                            </Route>
                            <Route exact path="/comics">
                                <ComicPage />
                            </Route>
                            <Route exact path="/comics/:id">
                                <SinglePage Component={SingleComic} dataType="comic" />

                            </Route>
                            <Route exact path="/characters/:id">
                                <SinglePage Component={CharactersLink} dataType="character" />

                            </Route>
                            <Route>
                                <Page404 />
                            </Route>

                        </Switch>
                    </Suspense>

                </main>
            </div>
        </Router>
    )
}

export default App;