
export const getReleases = async (req, res) => {

    try {

        // Call API to get new releases
        const releasesResponse = await fetch("https://api.watchmode.com/v1/releases/?limit=35&apiKey=cSviycVPFYJeJaOpsP2FX0Vt645SKSpRkFMy7Uhi", {
            method: "GET",
            cache: "no-store"
        });

        if (releasesResponse.ok) {

            const { releases } = await releasesResponse.json();

            // Get the backdrop images for titles that will be displayed at the top of the home page
            const featured = releases.splice(0, 10);
            for (const elem of featured) {

                let backdropsRes = await fetch(`https://api.themoviedb.org/3/${ elem.tmdb_type }/${ elem.tmdb_id }/images`, {
                    method: "GET",
                    cache: "no-store",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": process.env.TMDB_AUTH_KEY
                    }
                });

                if (backdropsRes.ok) {
                    const { backdrops } = await backdropsRes.json();
                    elem.backdrop = backdrops[0];
                }
            }

            // Filter out titles with no backdrop image
            const featuredWithBackdrop = featured.filter(elem => elem.backdrop);

            return res.json({ featured: featuredWithBackdrop, releases });

        } else {
            res.status(404);
            return res.json({ err: "Could not fetch releases" });
        }
        
    } catch (err) {
        return res.json({ err: err.message });
    }

}