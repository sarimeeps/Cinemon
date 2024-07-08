import { useEffect, useState } from "react";
import BackDrop from "../components/backdrop/BackDrop";
import TitleSlider from "../components/titleSlider/TitleSlider";


export default function HomePage() {

    const [selected, setSelected] = useState();
    const [featured, setFeatured] = useState();
    const [romanceTitles, setRomanceTitles] = useState();
    const [comedyTitles, setComedyTitles] = useState();
    const [dramaTitles, setDramaTitles] = useState();


    useEffect(() => {

        fetch("http://localhost:4001/titles/releases", {
            method: "GET",
            cache: "no-store"
        })
        .then(res => res.json())
        .then(result => {

            setSelected(result.featured[0]);
            setFeatured(result.featured);
            setRomanceTitles(result.romanceTitles);
            setComedyTitles(result.comedyTitles);
            setDramaTitles(result.dramaTitles);

        })
        .catch(err => {
            alert(err.message);
        });

    }, []);




    return <>

        { selected !== undefined && (

            <div className="home-page page">
                <BackDrop selected={selected} featured={featured} />
                <TitleSlider title={"Romance"} list={romanceTitles} />
                <TitleSlider title={"Comedy"} list={comedyTitles} />
                <TitleSlider title={"Drama"} list={dramaTitles} />
            </div>

        )}
        
    </>
}