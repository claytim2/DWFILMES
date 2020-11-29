import React, {useState, useEffect} from "react";
import {Helmet} from "react-helmet";
import posed from "react-pose";
import LoadingAnimation from "./../LoadingAnimation/LoadingAnimation";
import HomeSlider from "../HomeSlider/HomeSlider";
import "./home.css";

const Hom = posed.div({
    enter: {y: 0, opacity: 1, delay: 300},
    exit: {
        y: 100,
        opacity: 0,
        transition: {duration: 200},
    },
});

const Home = () => {
    const [movieData, changeMovieData] = useState([]);
    const [tvData, changeTvData] = useState([]);
    const [celebData, changeCelebData] = useState([]);
    const [loaded, changeLoaded] = useState(false);

    useEffect(() => {
        let urlMovie =
            "https://api.themoviedb.org/3/movie/popular?api_key=4cc894b01eadfbbfbff1135572164973&language=en-US&page=1";
        let urlTv =
            "https://api.themoviedb.org/3/tv/popular?api_key=4cc894b01eadfbbfbff1135572164973&language=en-US&page=1";
        let urlCeleb =
            "https://api.themoviedb.org/3/person/popular?api_key=4cc894b01eadfbbfbff1135572164973&language=en-US&page=1";

        const fetchData = async (url, type) => {
            try {
                const response = await fetch(url);

                const data = await response.json();

                switch (type) {
                    case "movie":
                        changeMovieData(data.results);
                        break;
                    case "tv":
                        changeTvData(data.results);
                        break;
                    case "celeb":
                        changeCelebData(data.results);
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        };

        fetchData(urlMovie, "movie");
        fetchData(urlTv, "tv");
        fetchData(urlCeleb, "celeb");
        changeLoaded(true);
    }, []);

    return (
        <Hom>
            <Helmet>
                <title>DWFilmes Entretenimentos</title>
                <meta
                    name="description"
                    content = "Obtenha informações sobre seus filmes, programas de TV e celebridades favoritos"
                />
            </Helmet>
            {loaded && (
                <section className="home">
                    <h1 className="heading home-heading color-orange">
                        Popular
                    </h1>
                    {movieData.length !== 0 && (
                        <HomeSlider
                            name="Filmes"
                            data={movieData}
                            type="movie"
                            showMore={true}
                            to="../"
                        />
                    )}

                    {tvData.length !== 0 && (
                        <HomeSlider
                            name="TV-Seriados"
                            data={tvData}
                            type="tv"
                            showMore={false}
                            to="../"
                        />
                    )}

                    {celebData.length !== 0 && (
                        <HomeSlider
                            name="Pessoas"
                            data={celebData}
                            showMore={false}
                            type="people"
                            to="../"
                            cast={false}
                        />
                    )}
                </section>
            )}
            {!loaded && (
                <LoadingAnimation animation={true} message="Carregando..." />
            )}
        </Hom>
    );
};

export default Home;
