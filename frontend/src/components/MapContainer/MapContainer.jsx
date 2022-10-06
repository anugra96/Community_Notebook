import { useState, useEffect } from 'react';
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, Marker, Popup, FullscreenControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios";
import { Room } from "@material-ui/icons";
import "./MapContainer.scss";
import { marker_color, DB_URL } from '../../helpers';
import mapboxgl from 'mapbox-gl';

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;


function MapContainer({ notes, setNotes, selected, setSelected, mapRef, resetSelected, toggleCenter, setToggleCenter }) {

    const [currentCenter, setCurrentCenter] = useState(null);
    const [addNewActive, setAddNewActive] = useState(false);

    const [viewState, setViewState] = useState({
        longitude: selected.longitude,
        latitude: selected.latitude,
        zoom: selected.zoom
    });


    const [currentPlaceID, setCurrentPlaceID] = useState(null);
    const [newNote, setNewNote] = useState(null);
    const [subject, setSubject] = useState(null);
    const [desc, setDesc] = useState(null);
    const [tag, setTag] = useState(null);


    useEffect(() => {

        setCurrentPlaceID(selected.id);

    }, [selected]);

    useEffect(() => {

        if (addNewActive === true) {
            setToggleCenter(true);
        } else {
            setToggleCenter(false);
        }


    }, [addNewActive, setToggleCenter]);









    const handleMarkerClick = (id, subject, notes, tag, long, lat) => {
        let current_selected = {
            id: id,
            subject: subject,
            notes: notes,
            tag: tag,
            long: long,
            lat: lat,
            active: true
        }
        setSelected(current_selected);
        setCurrentPlaceID(id);
    };

    const handleZoom = (lat, long) => {
        mapRef.current.flyTo({
            center: [long, lat],
            speed: 0.6,
            curve: 2,
            zoom: 18
        });
    }



    const handleAddClick = (e) => {
        const long = e.lngLat.lng;
        const lat = e.lngLat.lat;
        console.log(e);
        setNewNote({
            lat: lat,
            long: long,
        });
    }

    const handleMarkerClose = () => {


        setSelected(resetSelected);
        setCurrentPlaceID(null)
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const postNewNote = {
            subject: subject,
            notes: desc,
            lat: newNote.lat,
            long: newNote.long,
            tag: tag
        };

        try {

            const res = await axios.post(DB_URL, postNewNote);
            setNotes([res.data, ...notes]);
            setNewNote(null);
            setAddNewActive(false);
            setToggleCenter(false);


        } catch (err) {
            console.log(err);
        }

    }


    const handleAfterLoad = () => {


        let new_center = {
            longitude: mapRef.current.getCenter().lng,
            latitude: mapRef.current.getCenter().lat
        };

        setCurrentCenter(new_center);

    }





    return (
        <>
            <div className="AddNew" onClick={() => setAddNewActive(!addNewActive)}><span>Add New Note</span></div>
            {(addNewActive === true) ?
                    <>
                    <button className="ConfirmButton" onClick={() => setNewNote({lat: currentCenter.latitude, long: currentCenter.longitude,})}>Confirm Location</button>
                    </>

                    :

                    <>
                    </>

            }

            <Map
                {...viewState}
                ref={mapRef}
                onMove={evt => setViewState(evt.viewState)}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/borderlinedataresearch/cl4itas7h000q15p91za9a60j"
                mapboxAccessToken='pk.eyJ1IjoiYm9yZGVybGluZWRhdGFyZXNlYXJjaCIsImEiOiJja3hjZG03bjYwMjdiMm5wZTIyN3dwZ3N4In0.WfLutrEyBlzP5tGoqmH0YA'
                onDblClick={handleAddClick}
                doubleClickZoom={false}
                onLoad={handleAfterLoad}
                onMoveEnd={handleAfterLoad}
            >

                {(addNewActive === true) ?
                    <>
                        <Marker
                            longitude={currentCenter.longitude}
                            latitude={currentCenter.latitude}
                            anchor="bottom"
                        >

                            <Room
                                style={{ fontSize: viewState.zoom * 4, color: "black", cursor: "pointer", stroke: "white", strokeWidth: 1 }}
                                onClick={() => setNewNote({lat: currentCenter.latitude, long: currentCenter.longitude})}
                            />

                        </Marker>
                    </>

                    :

                    <>
                    </>

                }


                {notes.map((n) => (

                    <>


                        <Marker
                            longitude={n.long}
                            latitude={n.lat}
                            anchor="center"
                        >

                            <Room
                                style={{ fontSize: n._id === selected.id ? viewState.zoom * 4 : viewState.zoom * 2, color: marker_color(n.tag), cursor: "pointer",stroke: "white", strokeWidth: 0.5 }}
                                onClick={() => handleMarkerClick(n._id, n.subject, n.notes, n.tag, n.long, n.lat)}
                            />


                        </Marker>
                        {n._id === currentPlaceID && (

                            <Popup
                                key={n._id}
                                className="card"
                                longitude={n.long}
                                latitude={n.lat}
                                anchor="bottom"
                                onOpen={() => handleZoom(n.lat, n.long)}
                                onClose={handleMarkerClose}
                                dynamicPosition={true}
                                closeOnClick={false}
                                offset={25}
                            >

                                {/* <h1 style={{color: marker_color(n.tag), borderColor: marker_color(n.tag)}}>Subject</h1> */}
                                <h4 className='subject'>{n.subject}</h4>
                                {/* <h1 style={{color: marker_color(n.tag), borderColor: marker_color(n.tag)}}>Description</h1> */}
                                <p className='desc'>{n.notes}</p>
                                {/* <h1 style={{color: marker_color(n.tag), borderColor: marker_color(n.tag)}}>Tag</h1> */}
                                <p className="tag" style={{backgroundColor: marker_color(n.tag)}}>{n.tag}</p>



                            </Popup>

                        )}

                    </>


                ))}

                {newNote && (
                    <Popup
                        longitude={newNote.long}
                        latitude={newNote.lat}
                        closeButton={true}
                        closeOnClick={false}
                        anchor="left"
                        onClose={() => setNewNote(null)}
                    >
                        <div>
                            <form onSubmit={handleSubmit}>
                                <label>Subject</label>
                                <input placeholder='Subject' onChange={(e) => setSubject(e.target.value)} />
                                <label>Description</label>
                                <textarea placeholder='Description' onChange={(e) => setDesc(e.target.value)}></textarea>
                                <label>Category</label>
                                <select onChange={(e) => setTag(e.target.value)}>
                                    <option value="Food">Food</option>
                                    <option value="Climate">Climate</option>
                                    <option value="Income">Income</option>
                                    <option value="Health">Health</option>
                                    <option value="Community">Community</option>
                                    <option value="Housing">Housing</option>
                                    <option value="Sidewalks">Sidewalks</option>
                                    <option value="Gentrification">Gentrification</option>
                                    <option value="Short-Term Rentals">Short-Term Rentals</option>
                                    <option value="Infrastructure">Infrastructure</option>
                                </select>
                                <button className='submitButton' type="submit">Add Note</button>
                                <label></label>
                                <label></label>
                            </form>
                        </div>

                    </Popup>
                )}




                <FullscreenControl
                    position='bottom-left'
                
                />
            </Map>

            

        </>

            );
}

export default MapContainer;

