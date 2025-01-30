import { useState, useEffect } from "react";
import LocationList from "./locationlist";

export default function CampaignOverview() {

    const [campaignName, setCampaignName] = useState("My Cool Campaign!")
    
    const [planeList, setPlaneList] = useState([{   name: "Plane of Reality",
        notesList: [{title: "Reality!", 
                    content: "egg",
                    id: 1}, 
                    {title: "Truth!",
                    content: "Wow!",
                    id: 2
                    }],
        eventsList: [{title: "The Big Bad comes to town",
                    content: "This is a really cool plot hook!",
                    id: 11}],
        npcList:[],
        itemList: [],
        subLocations: [],
        type: "pl",
        id: 1, }]);
    const [realmList, setRealmList] = useState([])
    const [countryList, setCountryList] = useState([{ name: "Country of Cityvilla",
        notesList: [{title: "Woah! Big Banks", 
                    content: "im tired",
                    id: 12,}, 
                    {title: "The King's secret affair",
                    content: "Wow!",
                    id: 22,
                    }],
        eventsList: [{title: "The Big Bad comes to the other town",
                    content: "This is also really cool plot hook!",
                    id: 122,}],
        npcList:[],
        itemList: [],
        subLocations: [{title: "Citysville2",
                        content: "i swear i'll make the proper components",
                        id: 13
                        }],
        type: "co",
        id: 100}])
    const [regionList, setRegionList] = useState([])

    

    async function sortData() {
        for (location in rawLocationData){
            if (location.type=="pl"){
                console.log("This is a plane.")
                setPlaneList([...planeList, location]);
            } else if (location.type == "rm"){
                console.log("This is a realm.")
                setRealmList([...realmList, location]);
            } else if (location.type == "co"){
                console.log("This is a country.")
                setCountryList([...countryList, location]);
            } else if (location.type == "rg"){
                console.log("This is a region.")
                setRegionList([...regionList, location]);
            }
        }
    }

    // useEffect(() => {
    //     sortData(), []
    // })

    const [showPlanes, setShowPlanes] = useState(false);
    const [showRealms, setShowRealms] = useState(false);
    const [showCountries, setShowCountries] = useState(false);
    const [showRegions, setShowRegions] = useState(false);


    return(
        <div>
            <h1 className="text-3xl">{campaignName}</h1>
            <div>
                <button onClick={()=>{setShowPlanes(!showPlanes)}}>
                    <h2>Planes</h2>
                </button>
                {showPlanes && <LocationList listOfLocations={planeList} size={"lg"}/>}
            </div>
            <div>
                <button onClick={()=>{setShowRealms(!showRealms)}}>
                    <h2>Realms</h2>
                </button>
                {showRealms && <LocationList listOfLocations={realmList} size={"lg"}/>}
            </div>
            <div>
                <button onClick={()=>{setShowCountries(!showCountries)}}>
                    <h2>Countries</h2> 
                </button>
                {showCountries && <LocationList listOfLocations={countryList} size={"md"}/>}
            </div>
            <div>
                <button onClick={()=>{setShowRegions(!showRegions)}}>
                    <h2>All Regions</h2>
                </button>
                
                {showRegions && <LocationList listOfLocations={regionList} size={"sm"}/>}
            </div>
        </div>
    )
    
}