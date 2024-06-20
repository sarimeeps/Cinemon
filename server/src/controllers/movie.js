

export const getReleases = async (req, res) => {

    try {

        const releasesResponse = await fetch("https://api.watchmode.com/v1/releases/?apiKey=cSviycVPFYJeJaOpsP2FX0Vt645SKSpRkFMy7Uhi", {
            method: "GET",
            cache: "no-store"
        });

        if (releasesResponse.ok) {

            const { releases } = await releasesResponse.json();
            return res.json({ releases });

        } else {
            res.status(404);
            return res.json({ err: "Could not fetch releases" });
        }
        
    } catch (err) {
        return res.json({ err: err.message });
    }

}