import React from 'react';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Container.scss";
import MapContainer from '../MapContainer/MapContainer';
import Metadata from '../Metadata/Metadata';
import FilterTags from '../FilterTags/FilterTags';
import BorderlineLogo from "../../resources/borderlinelogo_blue.png";
import { marker_color, DB_URL, format_date } from '../../helpers';




export default function Container({toggleCenter, setToggleCenter}) {
    const mapRef = useRef();
    const [filterButton, setFilterButton] = useState(false);
    const [selected, setSelected] = useState(
        {
            id: 0,
            subject: "",
            notes: "",
            tag: "",
            longitude: -78.29339136453804,
            latitude: 43.949753220012944,
            zoom: 13,
            active: false,
            createdAt: ""
        }
    );
    const [done, setDone] = useState(false);

    const [notes, setNotes] = useState([]);


    const resetSelected = () => {
        let reset = {
            id: 0,
            subject: "",
            notes: "",
            tag: "",
            longitude: -78.29339136453804,
            latitude: 43.949753220012944,
            zoom: 20,
            active: false
        }

        setSelected(reset);
    }


    // get all notes from database on load
    useEffect(() => {
        const getNotes = async () => {
            try {
                const res = await axios.get(DB_URL);
                setNotes(res.data);
                setDone(true);
            } catch (err) {
                console.log(err);
            }
        }
        getNotes();
    }, []);



    return (
        <>

            <div className="Container">


                <div className="left">

                    <FilterTags notes={notes} setNotes={setNotes} done={done} filterButton={filterButton}/>

                    {(filterButton) ? 
                    
                    <>
                    <div className="closeFilterButton" onClick={() => setFilterButton(!filterButton)}>Minimize</div>
                    </>
                    :

                    <div className="filterButton" onClick={() => setFilterButton(!filterButton)}>Filter Categories</div>
                    
                    }
                    
                    

                    {notes.map((n) => (
                                <div 
                                    key={n._id} 
                                    style={{borderColor: (n._id === selected.id) ? marker_color(n.tag) : "#0b6670"}}
                                    className={(n._id === selected.id) ? "Note-Active" : "Note"} 
                                    onClick={() => setSelected({ id: n._id, subject: n.subject, notes: n.notes, tag: n.tag, longitude: n.long, latitude: n.lat, zoom: 18, active: (!selected.active), createdAt: (n.createdAt) })}>
                                    <div className="details">
                                        <div className="header">
                                            <h1>{n.subject}</h1>
                                            <img src={BorderlineLogo} alt="" />
                                        </div>
                                        <h2>{n.notes}</h2>
                                        <div className="metadata">
                                            <div className="tag" style={{ backgroundColor: marker_color(n.tag) }}><h3>{n.tag}</h3></div>
                                            <div className="timestamp"><span>{format_date(n.createdAt)}</span></div>
                                        </div>


                                    </div>


                                </div>
                    ))}






                </div>


                <div className="right">
                    <MapContainer notes={notes} setNotes={setNotes} selected={selected} mapRef={mapRef} setSelected={setSelected} resetSelected={resetSelected} toggleCenter={toggleCenter} setToggleCenter={setToggleCenter}/>
                    {(toggleCenter === true) ?
                    
                    <span className="dot"></span>
                
                    :

                    <></>
                    }
                    
                    <Metadata />
                    <div className="hintbox"><div className="hint_text">HINT: Double tap anywhere to add a note!</div></div>
                </div>


            </div>
        </>
    )
}
