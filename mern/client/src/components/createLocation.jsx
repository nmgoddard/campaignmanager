import { useState } from "react"


export default function CreateLocation({addNewLocationFunc, hideCreateFormFunc}){

    const [name, setName] = useState("")
    const [type, setType] = useState("pl")

    function handleSubmitFunc(){
        event.preventDefault();
        console.log(typeof(name))
        let locationObj = {
            name: name,
            type: type
        }
        addNewLocationFunc(locationObj);
        hideCreateFormFunc();
    }

    return(
        <form onSubmit={handleSubmitFunc}
        className="absolute flex-col bg-white justify-center align-center">
            <label>Name</label>
            <input type="text" value={name} onChange={()=>{setName(event.target.value)}}></input>
            <label>Type</label>
            <select value={type} onChange={()=>{setType(event.target.value)}}>
                <option value="pl">Plane</option>
                <option value="rm">Realm</option>
                <option value="co">Country</option>
                <option value="rg">Region</option>
            </select>
            <button>Create</button>
        </form>
    )
}