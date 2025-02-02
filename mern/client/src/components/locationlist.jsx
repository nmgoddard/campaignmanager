import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function LocationList({ parentLocationID, locationType, campaignID }) {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLocations = async () => {
            if (!campaignID) {
                setError("Missing campaignID. Cannot fetch locations.");
                setLoading(false);
                return;
            }

            try {
                const endpoint = parentLocationID
                    ? `http://localhost:5050/locations/parent/${parentLocationID}`
                    : `http://localhost:5050/locations/campaign/${campaignID}/type/${locationType}`;

                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error(`Error fetching locations: ${response.statusText}`);
                }
                const data = await response.json();

                console.log("Fetched locations:", data); // Debugging log

                // Ensure data is an array
                if (!Array.isArray(data)) {
                    throw new Error("Invalid API response: Expected an array.");
                }

                // Filter out any malformed locations (missing _id or name)
                const validLocations = data.filter(loc => loc._id && loc.name);
                if (validLocations.length !== data.length) {
                    console.warn("Some locations were missing required fields and were filtered out.");
                }

                setLocations(validLocations);
            } catch (err) {
                console.error("Failed to fetch locations:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, [parentLocationID, campaignID, locationType]);

    const handleCreateLocation = async () => {
        const name = prompt("Enter location name:", "New Location");
        if (!name) return;

        try {
            const newLocation = { name, locationType, campaignID, parentLocationID: parentLocationID || null };
            const response = await fetch("http://localhost:5050/locations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newLocation),
            });

            if (!response.ok) throw new Error("Failed to create location");

            const createdLocation = await response.json();
            console.log("Created location:", createdLocation); // ✅ Debugging log

            navigate(`/locations/${createdLocation._id || createdLocation.insertedId}`);
        } catch (error) {
            console.error(error);
            setError("Failed to create location.");
        }
    };

    if (loading) return <p className="text-gray-600">Loading locations...</p>;
    if (error)
        return (
            <div className="bg-red-200 text-red-800 p-2 rounded">
                <p>Error: {error}</p>
            </div>
        );

    return (
        <div className="flex-1 flex-col justify-center max-w-6xl min-w-96 rounded-lg p-2" style={{ background: "#e9bf69" }}>
            {locations.length === 0 ? (
                <div className="text-center">
                    <p className="text-lg">No locations of type {locationType} available.</p>
                    <button onClick={handleCreateLocation} className="mt-2 bg-green-600 text-white px-4 py-2 rounded">
                        Create One
                    </button>
                </div>
            ) : (
                locations.map((location) => (
                    <div key={location._id} className="p-2 border-b">
                        <Link to={`/locations/${location._id}`} className="text-xl font-bold hover:underline">
                            {location.name}, {location._id}
                        </Link>
                    </div>
                ))
            )}
            <button onClick={handleCreateLocation} className="bg-green-600 text-white px-4 py-2 rounded mt-2">
                +
            </button>
        </div>
    );
}

LocationList.propTypes = {
    parentLocationID: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    locationType: PropTypes.string.isRequired,
    campaignID: PropTypes.string.isRequired,
};
