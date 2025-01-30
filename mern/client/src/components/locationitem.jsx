import { useEffect, useState } from "react";
import NotesList from "./noteslist";
import { use } from "react";

export default function LocationItem({locationObj, size}) {
    const{  name,
            notesList,
            eventsList,
            npcList,
            itemList, 
            subLocations,
    } = locationObj;

    const [showNotes, setShowNotes] = useState(false);
    const [showEvents, setShowEvents] = useState(false);
    const [showLocations, setShowLocations] = useState(false);
    

    if (size == "lg") {
    return(
        <div>
            <h2>{name}</h2>
            <h3>Notes</h3>
            <NotesList listOfNotes = {notesList}/>
            <h3>Events</h3>
            <NotesList listOfNotes = {eventsList}/>
        </div>
    )
    } else if (size == "md") {
    return(
        <div>
            <h2>{name}</h2>
            <h3>Notes</h3>
            <NotesList listOfNotes = {notesList}/>
            <h3>Events</h3>
            <NotesList listOfNotes = {eventsList}/>
            <h3>Sub-Locations</h3>
            <NotesList listOfNotes = {subLocations}/>
        </div>
    )
    } else if (size == "sm") {
    return(
        <div>
            <h2>{name}</h2>
            <h3>Notes</h3>
            <NotesList listOfNotes = {notesList}/>
            <h3>Events</h3>
            <NotesList listOfNotes = {eventsList}/>
            <h3>NPCs</h3>
            <h3>Items</h3>
            <NotesList listOfNotes = {itemList}/>
            <h3>Sub-Locations</h3>
            <NotesList listOfNotes = {subLocations}/>
        </div>
    )
    } else {
        return(
            <div>
                <p>Invalid size parameter.</p>
            </div>
        )
    }
}