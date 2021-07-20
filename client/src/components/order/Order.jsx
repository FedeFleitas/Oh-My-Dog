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
        <div>
            <label >Order by: </label>
            <button onClick={(e) => orderAsc(e)}>a-z</button>
            <button onClick={(e) => orderDesc(e)}>z-a</button>
        </div>
        <div>
            <div>
                <form>
                    <label className={styles.label}>Source</label>
                    <br />
                    <select className={styles.select} onChange={handleSelect}>
                        <option value="null">Select</option>
                        <option value="DB">DB</option>
                        <option value="API">API</option>
                        <option value="ALL">ALL</option>
                    </select>
                </form>
            </div>
        </div>
        </>
    )
}