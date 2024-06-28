import { useEffect, useState } from "react";
import BackDrop from "../components/backdrop/BackDrop";


export default function HomePage() {

    const [selected, setSelected] = useState();
    const [featured, setFeatured] = useState();


    useEffect(() => {

        fetch("http://localhost:4001/titles/releases", {
            method: "GET",
            cache: "no-store"
        })
        .then(res => res.json())
        .then(result => {

            setSelected(result.featured[4]);

        })
        .catch(err => {
            alert(err.message);
        });

    }, []);




    return <>

        { selected !== undefined && (

            <div className="home-page page">
                <BackDrop selected={selected} featured={featured} />
            </div>

        )}
        
    </>
}