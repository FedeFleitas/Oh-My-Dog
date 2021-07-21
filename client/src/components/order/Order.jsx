import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAZ, getZA } from '../../actions'
import { getSource } from '../../actions';
import styles from './order.module.css';


export default function Order() {

    const dispatch = useDispatch();

    //a-z
    let orderAsc = (e) => {
        e.preventDefault()
        dispatch(getAZ())
    }
    //z-a
    let orderDesc = (e) => {
        e.preventDefault()
        dispatch(getZA())
    }

    //menor peso
    /* let orderDesc = (e) => {
        e.preventDefault()
        dispatch(getZA())
    } */
    //mayor peso

    //temp

    //origen api / DB
    function handleSelect(e) {
        if (e.target.value === "null") {
            return alert("Please insert a valid value");
        } else {
            dispatch(getSource(e.target.value));
        }
    }


    return (
        <>
            <div className={styles.order}>
                <label >Order your dogs </label>
                <div>
                    <label >By name: </label>
                    <button onClick={(e) => orderAsc(e)}>A-Z</button>
                    <button onClick={(e) => orderDesc(e)}>Z-A</button>
                </div>
                <div>
                    <label >By weight </label>
                    <button onClick={(e) => orderAsc(e)}>Asc</button>
                    <button onClick={(e) => orderDesc(e)}>Des</button>
                </div>
                <div>
                    <form>
                        <label className={styles.label}>Filter by  </label>
                        {/* <br /> */}
                        <select className={styles.select} onChange={handleSelect}>
                            <option value="null">Select</option>
                            <option value="DB">Created</option>
                            <option value="API">Existing</option>
                            <option value="API">Temperament</option>
                            <option value="ALL">ALL</option>
                        </select>
                    </form>
                </div>
            </div>
        </>
    )
}