

import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import Logo from "../../img/dog.png"
import SearchBar from './SearchBar';

export default function Nav() {
    return (
        <header className={styles.navbar}>
            <NavLink exact to="/">
                <img id="logoHenry" src={Logo} className={styles.logoImg} alt="logotype" />
            </NavLink>
            <nav className={styles.routes}>
                <div className={styles.inicio}>
                    <NavLink to="/">Inicio</NavLink>
                </div>
                <div className={styles.dogs}>
                  <NavLink to="/dogs">Dogs</NavLink>
                </div>
                <div className={styles.createDog}>
                    <NavLink to="/dogs/create">Create Dog</NavLink> 
                </div>
            </nav>
            <div>
                <SearchBar/>
            </div>
        </header>
    )
}