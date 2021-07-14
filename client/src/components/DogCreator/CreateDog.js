import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './CreateDog.module.css';


export default function CreateDog() {
  return (
    <div className={styles.createDog}>
      <h1>Create Dog</h1>
      <NavLink exact to="/dogs" className="EntryButton">Create Dog</NavLink>
    </div>
  )
};