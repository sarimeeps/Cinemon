
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

                let titleRes = await fetch(`https://api.watchmode.com/v1/title/${ elem.id }/details/?apiKey=${ process.env.WATCH_MODE_API_KEY }`, {
                    method: "GET",
                    cache: "no-store"
                });

                if (backdropsRes.ok && titleRes.ok) {
                    const { backdrops } = await backdropsRes.json();
                    const title = await titleRes.json();

                    elem.backdrop = backdrops[0];
                    elem.year = title.year;
                    elem.runtime = title.runtime_minutes;
                    elem.genre = title.genre_names[0];
                    elem.runtime = title.runtime_minutes;

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
        res.status(500);
        return res.json({ err: err.message });
    }

}

// POST: Search for a title
export const searchTitle = (req, res) => {

    const { searchQuery } = req.body;

    // Handle API call using promise chaining
    fetch(`https://api.watchmode.com/v1/autocomplete-search/?apiKey=${ process.env.WATCH_MODE_API_KEY }&search_value=${ searchQuery }&search_type=2`, {
        method: "GET",
        cache: "no-store"
    })
    .then(searchRes => searchRes.json())
    .then(results => {
        return res.json({ results });
    })
    .catch(err => {
        res.status(500);
        return res.json({ err: "There was a problem fetching the results" });
    });
    
}

// GET: Get a single title
export const getTitle = async (req, res) => {

    const { titleId } = req.params;

    try {

        const titleRes = await fetch(`https://api.watchmode.com/v1/title/${ titleId }/details/?apiKey=${ process.env.WATCH_MODE_API_KEY }`, {
            method: "GET",
            cache: "no-store"
        });

        const crewRes = await fetch(`https://api.watchmode.com/v1/title/${ titleId }/cast-crew/?apiKey=${ process.env.WATCH_MODE_API_KEY }`, {
            method: "GET",
            cache: "no-store"
        });

        if (titleRes.ok && crewRes.ok) {

            const title = await titleRes.json();
            const crew = await crewRes.json();

            return res.json({ title, crew });

        } else {
            res.status(titleRes.status);
            return res.json({ err: "There was a problem fetching this title "});
        }
        
    } catch (err) {
        res.status(500);
        return res.json({ err: "There was a problem fetching this title" });
    }

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
        res.status(500);
        return res.json({ err: "There was a problem fetching the titles "});
    }

}
