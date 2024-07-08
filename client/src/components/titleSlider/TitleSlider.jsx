import "./titleSlider.css";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TitleSlider({ title, list }) {

    const [titles, setTitles] = useState(list);

    // Slider settings
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
    };

    return <>
        <div className="slider">
            <p className="title">{ title }</p>
            <Slider {...settings} >

                {titles.map((elem, index) => (
                    <TitleCard key={index} title={elem} />
                ))}

            </Slider>
        </div>
    </>
}


function TitleCard({ title }) {

    return <>
        <div className="titleCard">
            {
                title.poster_path ?
                <img src={`https://image.tmdb.org/t/p/original${ title.poster_path }`} alt="poster" />
                :
                <img src={ title.poster_url } alt="poster" />
                
            }
            <p>{ title.title }</p>
        </div>
    </>
}