import "./backdrop.css";
import { Link } from "react-router-dom";


export default function BackDrop({ selected, featured }) {

    return <>
        <div className="backdrop">
            <div className="background">
                <img className="image" src={`https://image.tmdb.org/t/p/original/${ selected.backdrop.file_path }`} alt="" />

                <div className="info">
                    <div>
                        <h1>{ selected.title }</h1>
                        <p>{ selected.year }</p>
                        <p>{ selected.genre }</p>
                        { selected.runtime ? 
                            <p>{ selected.runtime } mins</p>
                            :
                            <p>Season { selected.season_number }</p>
                        }
                    </div>
                    <div className="link">
                        <Link to={`/${ selected.id }`} className="view-more-button">View More...</Link>
                    </div>
                </div>

                <div className="carousel">
                    
                </div>

            </div>
        </div>
    </>
}