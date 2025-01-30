import { useState, useEffect } from "react";
import LocationList from "./locationlist";

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