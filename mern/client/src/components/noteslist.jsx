import { useState } from "react"
import NoteItem from "./noteitem";
import PropTypes from "prop-types";

export default function NotesList({ listOfNotes, type }) {
    if (!Array.isArray(listOfNotes)) {
        console.error("listOfNotes must be an array:", listOfNotes);
        return (
            <div
                style={{ background: "#e9bf69" }}
                className="flex-1 flex-col justify-center max-w-6xl min-w-96 rounded-lg p-2"
            >
                <p>This section is empty.</p>
            </div>
        );
    }

    if (listOfNotes.length === 0) {
        return (
            <div
                style={{ background: "#e9bf69" }}
                className="flex-1 flex-col justify-center max-w-6xl min-w-96 rounded-lg p-2"
            >
                <p>This section is empty.</p>
            </div>
        );
    }

    return (
        <div
            style={{ background: "#e9bf69" }}
            className="flex-1 flex-col justify-center align-center max-w-96 min-w-96 rounded-lg p-2 relative"
        >
            {listOfNotes.map((note) => (
                <NoteItem noteObj={note} key={note.id} type={type} />
            ))}
        </div>
    )

    
    
}

NoteItem.propTypes = {
    noteObj: PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    }).isRequired,
};