import React, { useState, useEffect } from "react";
import instance from "../apis/netflix";

// import Swiper core and required modules
import { Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/scrollbar';

const img_url = "https://image.tmdb.org/t/p/original/"

const MovieItem = ({ title, fetchUrl, isLargeRow }) => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        async function fetchData() {
            const request = await instance.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    }, [fetchUrl])


    return (
        <div className="row">
            <h1>{title}</h1>

            <Swiper
                modules={[Navigation]}
                slidesPerView={6}
                slidesPerGroup={4}
                speed={1000}
                navigation
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >

                    <div className="row__posters">
                        {movies.map((movie) =>
                            <SwiperSlide key={movie.id}>
                            <img className={`row__poster ${isLargeRow && "row__poster--large"}`}
                                 loading="lazy"
                                 src={`${img_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                 alt={movie.name}
                            />
                            </SwiperSlide>
                        )}

                    </div>

            </Swiper>

        </div>
    )
}

export default MovieItem;
