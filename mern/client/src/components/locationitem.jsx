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

    const [showThisLocation, setShowThisLocation] = useState(false)
    const [showNotes, setShowNotes] = useState(false);
    const [showEvents, setShowEvents] = useState(false);
    const [showLocations, setShowLocations] = useState(false);
    const [showNPCs, setShowNPCs] = useState(false);
    const [showItems, setShowItems] = useState(false);
    

    if (size == "lg") {
    return(
        <div>
            <h2>
                <button onClick={()=>{setShowThisLocation(!showThisLocation)}}>{name}</button>
            </h2>
            {showThisLocation && <div>
                <h3>
                    <button onClick={()=>{setShowNotes(!showNotes)}}>Notes</button>
                </h3>   
                {showNotes && <NotesList listOfNotes = {notesList}/>}
                <h3>
                    <button onClick={()=>{setShowEvents(!showEvents)}}>Events</button>
                </h3>
                {showEvents && <NotesList listOfNotes = {eventsList}/>}
            </div>}
        </div>
    )
    } else if (size == "md") {
    return(
        <div>
            <h2>
                <button onClick={()=>{setShowThisLocation(!showThisLocation)}}>{name}</button>
            </h2>
            {showThisLocation && <div>
                <h3>
                    <button onClick={()=>{setShowNotes(!showNotes)}}>Notes</button>
                </h3>   
                {showNotes && <NotesList listOfNotes = {notesList}/>}
                <h3>
                    <button onClick={()=>{setShowEvents(!showEvents)}}>Events</button>
                </h3>
                {showEvents && <NotesList listOfNotes = {eventsList}/>}
                <h3>
                    <button onClick={()=>{setShowLocations(!showLocations)}}>SubLocations</button>
                </h3>
                {showLocations && <NotesList listOfNotes = {subLocations}/>}
            </div>}
        </div>
    )
    } else if (size == "sm") {
    return(
        <div>
            <h2>
                <button onClick={()=>{setShowThisLocation(!showThisLocation)}}>{name}</button>
            </h2>
            {showThisLocation && <div>
                <h3>
                    <button onClick={()=>{setShowNotes(!showNotes)}}>Notes</button>
                </h3>   
                {showNotes && <NotesList listOfNotes = {notesList}/>}
                <h3>
                    <button onClick={()=>{setShowEvents(!showEvents)}}>Events</button>
                </h3>
                {showEvents && <NotesList listOfNotes = {eventsList}/>}
                <h3>
                    <button onClick={()=>{setShowNPCs(!showNPCs)}}>NPCs</button>
                </h3>
                {showNPCs && <NotesList listOfNotes = {npcList}/>}
                <h3>
                    <button onClick={()=>{setShowItems(!showItems)}}>Items</button>
                </h3>
                {showItems && <NotesList listOfNotes = {itemList}/>}
                <h3>
                    <button onClick={()=>{setShowLocations(!showLocations)}}>SubLocations</button>
                </h3>
                {showLocations && <NotesList listOfNotes = {subLocations}/>}
            </div>}
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