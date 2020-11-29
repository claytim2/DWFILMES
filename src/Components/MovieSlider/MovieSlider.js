import React, {useState, useRef, useEffect} from "react";
import "./movie-slider.css";

const MovieSlider = props => {
    const sliderContainerRef = useRef();

    const [scrollPosition, changeScrollPosition] = useState(0);
    useEffect(() => {
        // Scroll to the new position based on changes in scrollToNExt and scrollToPrev functions.
        sliderContainerRef.current.scrollLeft = scrollPosition;
    }, [scrollPosition]);

    function scrollToNext() {
        if (props.type !== "full") {
            changeScrollPosition(
                scrollPosition + sliderContainerRef.current.offsetWidth / 2
            );
        } else {
            changeScrollPosition(
                scrollPosition + sliderContainerRef.current.offsetWidth - 50
            );
        }
    }

    function scrollToPrev() {
        if (props.type !== "full") {
            changeScrollPosition(
                scrollPosition - sliderContainerRef.current.offsetWidth / 2
            );
        } else {
            changeScrollPosition(
                scrollPosition - sliderContainerRef.current.offsetWidth
            );
        }
    }

    return (
        <section className="slider-container-wrappper">
            <button
                aria-label="previous"
                onClick={scrollToPrev}
                className="direction-arrow prev"
            >
                <span className="arrow arrow-left" />
            </button>
            <button
                aria-label="next"
                onClick={scrollToNext}
                className="direction-arrow next"
            >
                <span className="arrow arrow-right" />
            </button>
            <div className="slider-container" ref={sliderContainerRef}>
                {props.children}
                {/* Dummy used to leave a 50px gap at the end */}
                <div className="dummy">Isso é fictício</div>
            </div>
        </section>
    );
};

export default MovieSlider;
