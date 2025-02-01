import { useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

export default function NoteItem({noteObj, type}) {
    const {
        title,
        content,
        id
    } = noteObj;

    const [showContent, setShowContent] = useState(false);
    const [arrow, setArrow] = useState('▼');
    
    if (!noteObj || typeof noteObj !== "object") {
        console.error("Invalid noteObj passed to NoteItem:", noteObj);
        return null;
    }

    const toggleContent = () => {
        setShowContent(!showContent);
        if (arrow == '▼'){
            setArrow('▲')
        } else {
            setArrow('▼')
        }
    };

    if (type=="normal"){
    return (
        <div style={{ color: "#193E19" }} className="justify-center items-center flex flex-col border-b-2 border-black relative">
            <button className="flex flex-row max-w-6 min-w-96 mb-1 p-4 relative" onClick={toggleContent}>
                <h3 className="absolute left-2 top-1 bottom-0 text-xl ">{title}</h3>
                <p 
                className="absolute right-2 top-1 bottom-0">{arrow}</p>
            </button>
            {showContent && <p className="self-start mb-1">{content}</p>}
        </div>
        )
    } 

    if (type=="event"){

        const link = "/event?id=" + 0;

        return (
            <div style={{ color: "#193E19" }} className="justify-center items-center flex flex-col border-b-2 border-black relative">
                <button className="flex flex-row max-w-6 min-w-96 mb-1 p-4 relative" onClick={toggleContent}>
                    <h3 className="absolute left-2 top-1 bottom-0 text-xl ">{title}</h3>
                    <p 
                    className="absolute right-2 top-1 bottom-0">{arrow}</p>
                </button>
                {showContent && <p className="self-start mb-1">{content}</p>}
            </div>
            )
        } 
    

    NoteItem.propTypes = {
        noteObj: PropTypes.shape({
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        }).isRequired,
    };
    
}

NoteItem.propTypes = {
    noteObj: PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    }).isRequired,
};