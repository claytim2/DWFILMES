import React, {useState, useEffect} from "react";
import {Helmet} from "react-helmet";
import posed from "react-pose";
import HomeSlider from "../HomeSlider/HomeSlider";
import "react-lazy-load-image-component/src/effects/blur.css";
import LoadingAnimation from "./../LoadingAnimation/LoadingAnimation";
import "./movie-home.css";
import "./../Home/home.css";

const Hom = posed.div({
    enter: {y: 0, opacity: 1, delay: 300},
    exit: {
        y: 100,
        opacity: 0,
        transition: {duration: 200},
    },
});

const MovieHome = (props) => {
    const [topRated, changeTopRated] = useState([]);
    const [nowPlaying, changeNowPlaying] = useState([]);
    const [upcoming, changeUpcoming] = useState([]);
    const [countryCode, changeCountryCode] = useState(
        localStorage.getItem("userCountryCode")
    );
    const [country, changeCountry] = useState(
        localStorage.getItem("userCountry")
    );
    const [loaded, changeLoaded] = useState(true);

    useEffect(() => {
        if (
            localStorage.getItem("userCountry") === null ||
            localStorage.getItem("userCountryCode") === null
        ) {
            let urlCountry = "https://ipapi.co/json/";
            fetch(urlCountry)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    localStorage.setItem("userCountry", data.country_name);
                    localStorage.setItem("userCountryCode", data.country);
                    changeCountry(localStorage.getItem("userCountry"));
                    changeCountryCode(localStorage.getItem("userCountryCode"));
                });
        }

        const fetchData = async () => {
            let urlTopRated =
                "https://api.themoviedb.org/3/movie/top_rated?api_key=4cc894b01eadfbbfbff1135572164973&language=en-US&page=11";
            let urlNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=4cc894b01eadfbbfbff1135572164973&language=en-US&page=1&${
                countryCode === null ? "region=US" : `region=${countryCode}`
            }`;
            let urlUpcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=4cc894b01eadfbbfbff1135572164973&language=en-US&page=1&${
                countryCode === null ? "region=US" : `region=${countryCode}`
            }`;

            const responseTopRated = await fetch(urlTopRated);
            const dataTopRated = await responseTopRated.json();
            changeTopRated(dataTopRated.results);

            const responseNowPlaying = await fetch(urlNowPlaying);
            const dataNowPlaying = await responseNowPlaying.json();
            changeNowPlaying(dataNowPlaying.results);

            const responseUpcomning = await fetch(urlUpcoming);
            const dataUpcoming = await responseUpcomning.json();
            changeUpcoming(dataUpcoming.results);

            changeLoaded(true);
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        Filmes
                    </h1>

                    <HomeSlider
                        name={`Agora  ${country ? `no ${country}` : ""}`}
                        data={nowPlaying}
                        type="movie"
                        showMore={false}
                        to="../"
                    />

                    <HomeSlider
                        name={`Próximos ${country ? `no ${country}` : ""}`}
                        data={upcoming}
                        type="movie"
                        showMore={false}
                        to="../"
                    />

                    <HomeSlider
                        name={`Top Rated`}
                        data={topRated}
                        type="movie"
                        showMore={false}
                        to="../"
                    />
                </section>
            )}
            {!loaded && (
                <LoadingAnimation animation={true} message="Carregando .." />
            )}
        </Hom>
    );
};

export default MovieHome;
