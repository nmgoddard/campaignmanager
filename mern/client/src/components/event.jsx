import { useState } from "react"


export default function EventPage(){

    const [id, setId] = useState(0)

    const [title, setTitle] = useState("e");
    const [description, SetDescription] = useState("");
    const [notesList, setNotesList] = useState([]);
    const [monsterList, setMonsterList] = useState([]);
    const [itemList, setItemList] = useState([]); 
    const [NPClist, setNPCList] = useState([]);

    return(
        <div>
            <h2>{title}</h2>
            <p>{id}</p>


        </div>
    )
}