import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LandingPage.module.css';


export default function LandingPage() {
  return (
    <div className={styles.background}>
      <h1>Landing Page</h1>
      <NavLink exact to="/dogs" className="EntryButton">Home</NavLink>
      <footer className={styles.footer} >
        <h2>Made with ❤ by Federico Fleitas</h2>
      </footer>
    </div>
  )
};