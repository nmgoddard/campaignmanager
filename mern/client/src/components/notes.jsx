import NotesList from "./noteslist";

export default function Notes() {

    //placeholder data
    let noteList = [{title: "yayyyyy!", content: "This is such a cool note!", id: 1},
                    {title: "The evil little man", content: "This evil guy commits so many crimes. Like, I'm serious. SO many crimes.", id: 2},
                    {title: "Birds? No.", content:"birds are GOVERNMENT SPY DRONES. wake up sheeple.", id: 3}
    ]
    console.log(typeof(noteList));

    return (
        <NotesList listOfNotes={noteList}/>
    )
}