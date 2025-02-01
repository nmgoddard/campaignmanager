import { useState, useEffect } from "react";
import LocationList from "./locationlist";
import AddNew from "./addnew";
import CreateLocation from "./createLocation";

export default function CampaignOverview() {

    const [campaignName, setCampaignName] = useState("")
    const [planeList, setPlaneList] = useState([]);
    const [realmList, setRealmList] = useState([])
    const [countryList, setCountryList] = useState([])
    const [regionList, setRegionList] = useState([])

    const [showPlanes, setShowPlanes] = useState(false);
    const [showRealms, setShowRealms] = useState(false);
    const [showCountries, setShowCountries] = useState(false);
    const [showRegions, setShowRegions] = useState(false);
    const [locationCreate, showLocationCreate] = useState(false);

    function addNewLocationFunc(locationObj){
        let unsanitizedName = locationObj.name;
        console.log(typeof(unsanitizedName))
        let unsanitizedType = locationObj.type;
        let sanitizedType;

        const safeText = new RegExp()

        if (unsanitizedType == "pl" ||
            unsanitizedType == "rm" ||
            unsanitizedType == "co" ||
            unsanitizedType == "rg") {
                sanitizedType = unsanitizedType;
            } else {
                alert("Bad location type!")
                return;
            }
        
        

        let newLocationObj = {
            name: unsanitizedName,
            type: sanitizedType,
            notesList: [],
            eventsList: [],
            npcList: [],
            itemList: [],
            subLocations: [],
            id: 3
        }

        switch(newLocationObj.type){
            case "pl":
                setPlaneList([...planeList, newLocationObj]);
                break;
            case "rm":
                setRealmList([...realmList, newLocationObj]);
                break;
            case "co":
                setCountryList([...countryList, newLocationObj]);
                break;
            case "rg":
                setRegionList([...regionList, newLocationObj]);
                break;
            default:
                alert("Something went wrong. Please try again.")
                break;
        }
    }


    return(
        <div>
            <h1 className="text-3xl">{campaignName}</h1>
            <AddNew functionsList={()=>showLocationCreate(true)}/>
            {locationCreate && <CreateLocation addNewLocationFunc={addNewLocationFunc} hideCreateFormFunc={()=>showLocationCreate(false)}/>}
            <div>
                <h2 className="text-3xl">
                    <button onClick={()=>{setShowPlanes(!showPlanes)}}>
                        Planes
                    </button>
                </h2>
                {showPlanes && <LocationList listOfLocations={planeList} size={"lg"}/>}
            </div>
            <div>
                <h2>
                    <button onClick={()=>{setShowRealms(!showRealms)}}>
                        Realms
                    </button>
                </h2>
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