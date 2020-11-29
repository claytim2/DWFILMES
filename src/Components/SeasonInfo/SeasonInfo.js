import React from "react";
import {Link} from "@reach/router";
import posed from "react-pose";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import LoadingAnimation from "./../LoadingAnimation/LoadingAnimation";
import backdrop300 from "./../../backdrop-300.png";
import "./season-info.css";

const Mov = posed.div({
    enter: {y: 0, opacity: 1, delay: 300},
    exit: {
        y: 100,
        opacity: 0,
        transition: {duration: 200}
    }
});

const SeasonSelect = posed.div({
    on: {height: 0},
    off: {height: "auto"}
});

class SeasonInfo extends React.Component {
    state = {
        open: false,
        seasonNumber: 1,
        episodes: [],
        seasonArray: Array(parseInt(this.props.seasons)).fill(
            1,
            0,
            this.props.seasons
        ),
        loading: false
    };

    componentDidMount() {
        this.getEpisodes(this.state.seasonNumber);
    }

    getEpisodes = number => {
        const urlEpisode = `https://api.themoviedb.org/3/tv/${
            this.props.tvId
        }/season/${number}?api_key=4cc894b01eadfbbfbff1135572164973&language=en-US`;

        fetch(urlEpisode)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    episodes: data.episodes,
                    loading: !this.state.loading
                });
            });
    };

    handleSeasonChange = i => {
        this.setState(
            {
                open: !this.state.open,
                seasonNumber: i,
                loading: !this.state.loading
            },
            () => {
                console.log(this.state.seasonNumber);
            }
        );
        this.getEpisodes(i);
    };

    render() {
        console.log(this.state.loading);
        return (
            <Mov className="season-wrap">
                {this.state.loading && (
                    <section>
                        <Link
                            style={{textDecoration: "none"}}
                            to={`./../../../../../tv/${this.props.tvId}`}
                        >
                            <h1 className="season-head color-orange">
                                {this.props.name}
                            </h1>
                        </Link>
                        <h1
                            className="season-head color-orange"
                            onClick={() => {
                                this.setState({
                                    open: !this.state.open
                                });
                            }}
                        >
                            Select Season{" "}
                            {this.state.open ? (
                                <span
                                    className="episode-hand-emoji"
                                    role="img"
                                    aria-label="hand-down"
                                >
                                    &#128071;
                                </span>
                            ) : (
                                <span
                                    className="episode-hand-emoji"
                                    role="img"
                                    aria-label="hand-up"
                                >
                                    &#128070;
                                </span>
                            )}
                            {" " + this.state.seasonNumber}
                        </h1>
                        <SeasonSelect
                            className="season-selector season-card-wrapper"
                            pose={this.state.open ? "off" : "on"}
                        >
                            <ul>
                                {this.state.seasonArray.map((val, i) => {
                                    return (
                                        <li
                                            className="season-number-card"
                                            key={i}
                                            onClick={() =>
                                                this.handleSeasonChange(i + 1)
                                            }
                                        >
                                            <h1 className="season-head-number color-orange text-align-right">{`Season ${i +
                                                1}`}</h1>
                                        </li>
                                    );
                                })}
                            </ul>
                        </SeasonSelect>
                        <section className="season-card-wrapper">
                            {this.state.episodes.map((val, index) => {
                                return (
                                    <div
                                        key={index + 1}
                                        className="season-card"
                                    >
                                        <LazyLoadImage
                                            alt={val.name}
                                            src={
                                                val.still_path === null
                                                    ? backdrop300
                                                    : `https://image.tmdb.org/t/p/w342/${
                                                          val.still_path
                                                      }`
                                            }
                                            className="episode-still"
                                            effect="blur"
                                            placeholderSrc={backdrop300}
                                            onError={e =>
                                                (e.target.src = backdrop300)
                                            }
                                        />
                                        <div className="episode-info">
                                            <h3 className="episode-head color-orange">
                                                Episode {val.episode_number}
                                            </h3>
                                            <h2 className="episode-head">
                                                {val.name}
                                            </h2>
                                            <h3 className="episode-head">
                                                {new Date(
                                                    val.air_date
                                                ).toDateString()}
                                            </h3>
                                            <h3 className="episode-head">
                                                Directed by,{" "}
                                                {this.state.episodes[index]
                                                    .crew === undefined
                                                    ? "Não encontrado"
                                                    : this.state.episodes[
                                                          index
                                                      ].crew.map(val => {
                                                          if (
                                                              val.job ===
                                                              "Director"
                                                          ) {
                                                              return (
                                                                  val.name +
                                                                  " | "
                                                              );
                                                          }
                                                          return null;
                                                      })}
                                            </h3>
                                            <h3 className="episode-head">
                                                Written by,{" "}
                                                {this.state.episodes[index]
                                                    .crew === undefined
                                                    ? "Não encontrado"
                                                    : this.state.episodes[
                                                          index
                                                      ].crew.map(val => {
                                                          if (
                                                              val.job ===
                                                                  "Story" ||
                                                              val.job ===
                                                                  "Writer"
                                                          ) {
                                                              return (
                                                                  val.name +
                                                                  " | "
                                                              );
                                                          }
                                                          return null;
                                                      })}
                                            </h3>
                                            <p className="synopsis-episode episode-head">
                                                {val.overview}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </section>
                    </section>
                )}
                {!this.state.loading && (
                    <LoadingAnimation animation={true} message="Carregando .." />
                )}
            </Mov>
        );
    }
}

export default SeasonInfo;
