import "./featuredSlider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export default function FeaturedSlider({ titles }) {


    // Slider settings
    var settings = {
        dots: false,
        lazyLoad: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
    };

    return <>
        <div className="featured-slider">
            <Slider {...settings} >

                {titles.map((elem, index) => (
                    <Link to={`/${ elem.id }`}>
                        <TitleCard key={index} title={elem} />
                    </Link>
                ))}

            </Slider>
        </div>
    </>
}


function TitleCard({ title }) {

    return <>
        <div className="featured-titleCard">
            <img src={ title.poster_url } alt="poster" />
        </div>
    </>
}