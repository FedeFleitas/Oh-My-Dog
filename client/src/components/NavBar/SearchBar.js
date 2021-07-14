import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
//import { NavLink } from 'react-router-dom'
import { getDogs } from "../../actions";
import style from './SearchBar.module.css';

export default function SearchBar(props) {

    const [dogState, setDogState] = useState("");
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        console.log("dogState: ", dogState);
        dispatch(getDogs(dogState));
        setDogState("");
    }

    return (
        <div className={style.searchbar}>
            <input className={style.input}
                type='text'
                placeholder='Search here!'
                value = {dogState}
                onChange={ (event) => setDogState(event.target.value) }
            />                
            <button onClick={handleClick} type='submit' className={style.submit}>
                Search
            </button>
        </div>
    )
};