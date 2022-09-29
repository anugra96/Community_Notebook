import React from 'react';
import axios from "axios";
import { useRef, useState, useEffect } from 'react';
import { DB_URL, marker_color } from '../../helpers';
import "./FilterTags.scss";


const tag_names_json = [

    {
        id: 0,
        name: "Food",
        active: true
    },
    {
        id: 1,
        name: "Climate",
        active: true
    },
    {
        id: 2,
        name: "Income",
        active: true
    },
    {
        id: 3,
        name: "Health",
        active: true
    },
    {
        id: 4,
        name: "Community",
        active: true
    },
    {
        id: 5,
        name: "Housing",
        active: true
    },
    {
        id: 6,
        name: "Sidewalks",
        active: true
    },
    {
        id: 7,
        name: "Gentrification",
        active: true
    },
    {
        id: 8,
        name: "Short-Term Rentals",
        active: true
    },
    {
        id: 9,
        name: "Infrastructure",
        active: true
    },

];

const tag_names = [
    "Food",
    "Climate",
    "Income",
    "Health",
    "Community",
    "Housing",
    "Sidewalks",
    "Gentrification",
    "Short-Term Rentals",
    "Infrastructure"
];

const db_URL = "https://afternoon-eyrie-53412.herokuapp.com/api/note";



export default function FilterTags({ notes, setNotes, done, filterButton }) {
    const [tagsState, setTagsState] = useState(tag_names);
    const tagRef = useRef(tag_names);

    useEffect(() => {

        const getNotes = async () => {
            try {
                const res = await axios.get(DB_URL);
                const filteredNotes = (res.data).filter((n) => tagsState.includes(n.tag));
                setNotes(filteredNotes);
            } catch (err) {
                console.log(err);
            }
        }
        getNotes();


    }, [tagsState]);




    const handleClick = (name) => {
        if (!tagsState.includes(name)) {
            const newTags = tagsState.slice();
            newTags.push(name);
            setTagsState(newTags);
            console.log(newTags);
        } else {
            const newTagsRemoved = tagsState.filter((t) => t !== name);
            setTagsState(newTagsRemoved);
            console.log(newTagsRemoved);
        }
    }


    // const filterNotes = () => {

    //     const getNotes = async () => {
    //         try {
    //             const res = await axios.get("/note");
    //             const filteredNotes = (res.data).filter((n) => tagsState.includes(n.tag));
    //             setNotes(filteredNotes);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     getNotes();
    // }




    return (
        <div className="TagsContainer" style={{display: filterButton ? "flex" : "none"}} >

                {tag_names_json.map((n) => (


                    <div onClick={() => handleClick(n.name)} ref={tagRef} className="Tag" style={{ backgroundColor: tagsState.includes(n.name) ? marker_color(n.name) : "white", WebkitTextFillColor: tagsState.includes(n.name) ? "white" : "black", borderColor: tagsState.includes(n.name) ? marker_color(n.name) : "black", borderWidth: tagsState.includes(n.name) ? "2px" : "2px", borderStyle: "solid"}}>
                        <h1 style={{textShadow: tagsState.includes(n.name) ? "0px 0px 15px black" : "0px 0px 15px white"}} id={n.name}>{n.name}</h1>

                    </div>

                ))}


        </div>
    )
}
