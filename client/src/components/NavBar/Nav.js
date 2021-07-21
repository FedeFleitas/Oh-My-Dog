import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import Logo from "../../img/logotype.png"
import SearchBar from './SearchBar';
import Order from '../order/Order'

export default function Nav() {
    return (
        <header className={styles.navbar}>
            <NavLink exact to="/">
                <img id="logoHenry" src={Logo} className={styles.logoImg} alt="logotype" />
            </NavLink>
            <nav className={styles.routes}>
                <div >
                    <NavLink to="/" className={styles.inicio}>Inicio</NavLink>
                </div>
                <div >
                  <NavLink to="/dogs" className={styles.dogs}>Dogs</NavLink>
                </div>
                <div >
                    <NavLink to="/dogs/create" className={styles.createDog}>Create Dog</NavLink> 
                </div>
            </nav>
            <div>
                <SearchBar/>
            </div>
            <div>
                <Order />
            </div>
        </header>
    )
}