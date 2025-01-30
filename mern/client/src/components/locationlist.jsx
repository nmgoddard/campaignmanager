import { useState } from "react"
import LocationItem from "./locationitem";

export default function LocationList({ listOfLocations, size }) {
    if (!Array.isArray(listOfLocations)) {
        console.error("listOfLocations must be an array:", listOfLocations);
        return (
            <div
                style={{ background: "#e9bf69" }}
                className="flex-1 flex-col justify-center max-w-6xl min-w-96 rounded-lg p-2"
            >
                <p>No locations of this type are available.</p>
            </div>
        );
    }

    if (listOfLocations.length === 0) {
        return (
            <div
                style={{ background: "#e9bf69" }}
                className="flex-1 flex-col justify-center max-w-6xl min-w-96 rounded-lg p-2"
            >
                <p>No locations of this type are available. Maybe try making one?</p>
            </div>
        );
    }

    return (
        <div
            style={{ background: "#e9bf69" }}
            className="flex-1 flex-col justify-center max-w-6xl min-w-96 rounded-lg p-2"
        >
            {listOfLocations.map((location) => (
                <LocationItem locationObj={location} size={size} key={location.id} />
            ))}
        </div>
    )

    
    
}