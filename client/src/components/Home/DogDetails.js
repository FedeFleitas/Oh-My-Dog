import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './DogDetails.module.css';


export default function DogDetails() {
  return (
    <div className={styles.dogDetails}>
      <h1>Details</h1>
      <NavLink exact to="/dogs" className="EntryButton">details</NavLink>
    </div>
  )
};