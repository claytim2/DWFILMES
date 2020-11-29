import React, {lazy, Suspense, useEffect, useState} from "react";
import {Router, Location} from "@reach/router";
import posed, {PoseGroup} from "react-pose";
import Home from "./Components/Home/Home";
// import Movie from "./Components/Movie/Movie";
import MovieInfo from "./Components/MovieInfo/MovieInfo";
// import MovieHome from "./Components/MovieHome/MovieHome";
import Header from "./Components/Header/Header";
// import Search from "./Components/Search/Search";
import LoadingAnimation from "./Components/LoadingAnimation/LoadingAnimation";
import "./App.css";

import getFavs from "./Components/Fetch/getFavs";
import tryGettingUser from "./Components/Fetch/getUser";
import tryLogout from "./Components/Fetch/logout";

// const Header = true && import('./Components/Header/Header')
const Movie = lazy(() => import("./Components/Movie/Movie"));
const MovieHome = lazy(() => import("./Components/MovieHome/MovieHome"));
const Search = lazy(() => import("./Components/Search/Search"));
const Tv = lazy(() => import("./Components/Tv/Tv"));
const TvInfo = lazy(() => import("./Components/TvInfo/TvInfo"));
const SeasonInfo = lazy(() => import("./Components/SeasonInfo/SeasonInfo"));
const Login = lazy(() => import("./Components/Login/Login"));
const Register = lazy(() => import("./Components/Register/Register"));
const User = lazy(() => import("./Components/User/User"));
const NotFound = lazy(() => import("./Components/NotFound/NotFound"));

const RoutesContainer = posed.div({
    enter: {y: 0, opacity: 1, delay: 300, staggerChildren: 50},
    exit: {
        y: 100,
        opacity: 0,
        transition: {duration: 200}
    }
});

const App = () => {
    const [dialogues] = useState([
        "Que a força esteja com você.",
        "Você falando comigo?",
        "Eu vejo pessoas mortas.",
        "Aqui está o Johny!",
        "Hasta la vista, baby.",
        "Eu sou o rei do mundo!",
        "Meu precioso.",
        "Porquê tão sério?",
        "Elementar meu caro Watson.",
        "Para onde vamos, não precisamos de estradas"
    ]);
    const [name, changeName] = useState("");
    const [loggedIn, changeLoggedIn] = useState(
        localStorage.getItem("authToken") ? true : false
    );

    useEffect(() => {
        console.log(
            "%cStop!",
            "color:red;font-family:system-ui;font-size:4em;font-weight:bold"
        );

        console.log(
            "%cPlease don't enter anything into the console if you are not sure.",
            "color:black;font-family:system-ui;font-size:2em;font-weight:bold"
        );

        const getUser = async () => {
            const user = await tryGettingUser();

            if (user[0] === true) {
                changeName(user[1].user.username);
                changeLoggedIn(true);
            }
        };

        if (localStorage.getItem("authToken")) {
            getUser();
            getFavs();
        }
    });

    const handleLogout = async () => {
        const logoutSuccessfull = await tryLogout();

        if (logoutSuccessfull) {
            changeLoggedIn(true);
            window.location.href = "?/";
        } else {
            changeLoggedIn(false);
        }
    };

    return (
        <div className="app">
            <Header logout={handleLogout} name={name} isLoggedIn={loggedIn} />
            <Suspense
                fallback={
                    <LoadingAnimation animation={true} message="Caregando..." />
                }
            >
                <Location>
                    {({location}) => (
                        <PoseGroup className="main-outer">
                            <RoutesContainer key={location.key}>
                                <Router primary={false}>
                                    <NotFound
                                        default
                                        message="Hum, Nada Aqui! Estou em construção"
                                    />
                                    <Home path="/" />
                                    <Login path="/logar" />
                                    <Register path="/Registrar" />
                                    <Movie path="/movie">
                                        <MovieHome path="/" />
                                        <MovieInfo path=":movieId" />
                                    </Movie>
                                    <Tv path="/tv">
                                        {/* <TvHome path="/" /> */}
                                        <TvInfo path=":tvId" />
                                        <SeasonInfo path="/season/:tvId/:name/:seasons" />
                                    </Tv>
                                    <Search path="/search" />
                                    <Search path="/search/:query" />
                                    <User path="/user/:username" />
                                </Router>
                            </RoutesContainer>
                        </PoseGroup>
                    )}
                </Location>
            </Suspense>
            
        </div>
    );
};

export default App;
