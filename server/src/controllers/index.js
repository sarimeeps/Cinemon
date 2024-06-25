
// GET: Gets all the titles that will be shown on the home page
export const getHomePageTitles = async (req, res) => {

    try {

        // Call API to get new releases
        const releasesResponse = await fetch(`https://api.watchmode.com/v1/releases/?limit=35&apiKey=${ process.env.WATCH_MODE_API_KEY }`, {
            method: "GET",
            cache: "no-store"
        });

        // Call API to get genres list
        const romanceRes = await fetch(`https://api.themoviedb.org/3/discover/movie?include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10749`, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Accept": "application/json",
                "Authorization": process.env.TMDB_AUTH_KEY
            }
        });
        const comedyRes = await fetch(`https://api.themoviedb.org/3/discover/movie?include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35`, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Accept": "application/json",
                "Authorization": process.env.TMDB_AUTH_KEY
            }
        });
        const dramaRes = await fetch(`https://api.themoviedb.org/3/discover/movie?include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18`, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Accept": "application/json",
                "Authorization": process.env.TMDB_AUTH_KEY
            }
        });


        // Check if all calls were successful
        if (releasesResponse.ok && romanceRes.ok && comedyRes.ok && dramaRes.ok) {

            const { releases } = await releasesResponse.json();
            const romanceTitles = await romanceRes.json();
            const comedyTitles = await comedyRes.json();
            const dramaTitles = await dramaRes.json();

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

            return res.json({ featured: featuredWithBackdrop, 
                releases, 
                romanceTitles: romanceTitles.results,
                comedyTitles: comedyTitles.results,
                dramaTitles: dramaTitles.results 
            });

        } else {
            res.status(404);
            return res.json({ err: "Could not fetch releases" });
        }
        
    } catch (err) {
        return res.json({ err: err.message });
    }

}

// POST: Search for a title
export const searchTitle = async (req, res) => {

    const { searchQuery } = req.body;

    try {

        const resultsRes = await fetch(`https://api.watchmode.com/v1/autocomplete-search/?apiKey=${ process.env.WATCH_MODE_API_KEY }&search_value=${ searchQuery }&search_type=2`, {
            method: "GET",
            cache: "no-store"
        });

        if (resultsRes.ok) {

            const { results } = await resultsRes.json();

            return res.json({ results });

        }
        
    } catch (err) {
        res.status(500);
        return res.json({ err: "There was a problem fetching the results "});
    }

}

// GET: Get a single title
export const getTitle = (req, res) => {

    const { titleId } = req.params;

    fetch(`https://api.watchmode.com/v1/title/${ titleId }/details/?apiKey=${ process.env.WATCH_MODE_API_KEY }`, {
        method: "GET",
        cache: "no-store"
    })
    .then(res => res.json())
    .then(result => {
        return res.json({ title: result });
    })
    .catch(err => {
        res.status(500);
        return res.json({ err: "There was an error fetching this title"})
    });

}

// GET: Get titles by genre according to WatchMode genre ids
export const getTitlesByGenre = async (req, res) => {

    const { genreId } = req.params;

    try {

        const titlesRes = await fetch(`https://api.watchmode.com/v1/list-titles/?apiKey=${ process.env.WATCH_MODE_API_KEY }&genres=${ genreId }&limit=30`, {
            method: "GET",
            cache: "no-store"
        });

        if (titlesRes.ok) {

            const { titles } = await titlesRes.json();

            // Get the poster image for each title
            for (const elem of titles) {

                let postersRes = await fetch(`https://api.themoviedb.org/3/${ elem.tmdb_type }/${ elem.tmdb_id }/images`, {
                    method: "GET",
                    cache: "no-store",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": process.env.TMDB_AUTH_KEY
                    }
                });

                if (postersRes.ok) {
                    const { posters } = await postersRes.json();
                    elem.poster = posters[0];
                }
            }

            return res.json({ titles });

        } else {
            res.status(404);
            return res.json({ err: "Error fetching results" });
        }
        
    } catch (err) {
        console.log(err.message);
        res.status(500);
        return res.json({ err: "There was a problem fetching the titles "});
    }

}