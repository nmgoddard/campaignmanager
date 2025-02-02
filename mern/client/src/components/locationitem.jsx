import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import NotesList from "./noteslist";

export default function LocationItem() {
    const { id } = useParams(); // Get ID from the URL
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Expand/collapse states
    const [showNotes, setShowNotes] = useState(false);
    const [showEvents, setShowEvents] = useState(false);
    const [showNPCs, setShowNPCs] = useState(false);
    const [showItems, setShowItems] = useState(false);
    const [showSublocations, setShowSublocations] = useState(false);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch(`http://localhost:5050/locations/${id}`);
                if (!response.ok) {
                    throw new Error(`Error fetching location: ${response.statusText}`);
                }
                const data = await response.json();
                setLocation(data);
            } catch (err) {
                console.error("Failed to fetch location:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, [id]);

    if (loading) return <p className="text-gray-600">Loading location details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!location) return <p className="text-red-500">Location not found.</p>;

    const {
        name,
        description,
        notesList = [],
        eventsList = [],
        npcList = [],
        itemList = [],
        subLocations = [],
        locationType
    } = location;

    return (
        <div className="p-4 border rounded-lg bg-white shadow-md">
            {/* Location Title */}
            <h2 className="text-2xl font-bold">
                <Link to={`/locations/${id}`} className="hover:underline">
                    {name} ({locationType})
                </Link>
            </h2>

            {/* Description */}
            <p className="text-gray-600 italic">{description || "No description available."}</p>

            {/* Notes Section */}
            <button onClick={() => setShowNotes(!showNotes)} className="mt-2 text-blue-600 underline">
                Notes {showNotes ? "▼" : "▶"}
            </button>
            {showNotes && <NotesList listOfNotes={notesList} />}

            {/* Events Section */}
            <button onClick={() => setShowEvents(!showEvents)} className="mt-2 text-blue-600 underline">
                Events {showEvents ? "▼" : "▶"}
            </button>
            {showEvents && (
                <ul className="ml-4 list-disc">
                    {eventsList.map((event, index) => (
                        <li key={index}>{event.name}</li>
                    ))}
                </ul>
            )}

            {/* NPCs & Items (Only for Regions and Sites) */}
            {["Region", "Site"].includes(locationType) && (
                <>
                    <button onClick={() => setShowNPCs(!showNPCs)} className="mt-2 text-blue-600 underline">
                        NPCs {showNPCs ? "▼" : "▶"}
                    </button>
                    {showNPCs && (
                        <ul className="ml-4 list-disc">
                            {npcList.map((npc, index) => (
                                <li key={index}>{npc.name}</li>
                            ))}
                        </ul>
                    )}

                    <button onClick={() => setShowItems(!showItems)} className="mt-2 text-blue-600 underline">
                        Items {showItems ? "▼" : "▶"}
                    </button>
                    {showItems && (
                        <ul className="ml-4 list-disc">
                            {itemList.map((item, index) => (
                                <li key={index}>{item.name}</li>
                            ))}
                        </ul>
                    )}
                </>
            )}

            {/* Sublocations (Only for Regions and Sites) */}
            {["Region", "Site"].includes(locationType) && subLocations.length > 0 && (
                <>
                    <button onClick={() => setShowSublocations(!showSublocations)} className="mt-2 text-blue-600 underline">
                        Sublocations {showSublocations ? "▼" : "▶"}
                    </button>
                    {showSublocations &&
                        subLocations.map((sub) => (
                            <div key={sub._id} className="ml-4">
                                <Link to={`/locations/${sub._id}`} className="text-lg font-semibold hover:underline">
                                    {sub.name} ({sub.locationType})
                                </Link>
                            </div>
                        ))}
                </>
            )}
        </div>
    );
}

/** Prop Validation for Type Safety */
LocationItem.propTypes = {
    id: PropTypes.string, // `useParams` provides `id` as a string
};
