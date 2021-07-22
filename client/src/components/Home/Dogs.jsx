import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from '../../actions'
import styles from './Dogs.module.css';
import logo from '../../img/loading....gif'


export let Dogs = () => {
  //global states
  const dogsToShow = useSelector((state) => state.filtered);
  const dispatch = useDispatch();
  console.log(dogsToShow)
  useEffect(() => { dispatch(getDogs()) }, [])
  //local states
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setitemsPerPage] = useState(8)
  
  const [maxPageNumberLimits, setMaxPageNumberLimits] = useState(5);//
  const [minPageNumberLimits, setMinPageNumberLimits] = useState(0);
  const pageNumberLimits = 5; //para setear los estados min y max con el numero limite

  let handleClick = (event) => {
    setCurrentPage(Number(event.target.id))
  }

  //si no hay perris, hay respuesta!!! :D
  if (typeof dogsToShow[0] === 'string') {
    return (
      <div>
        <h1>Sorry, breed not found!</h1>
        <img src={logo} alt='breed not found' />
      </div>
    )
  };

  //les agrega el temperamento especifico a cada perro
  dogsToShow[0] && dogsToShow?.map((e) => {
    if (e.id.length > 4 && e.temperaments) {
      e.temperament = ""
      for (let i = 0; i < e.temperaments.length; i++) {//el dato que llega desde el back es un Array
        e.temperament += e.temperaments[i].name.toString() + ", " 
      }//paso a temperament cada uno, para que todos me queden con su temp
    }
  })

    //Logica matematica del paginado

  const PAGES = []; //el numero de paginas a mostrar, 22 en el primer caso
  for (let i = 1; i <= Math.ceil(dogsToShow.length / itemsPerPage); i++) {
    PAGES.push(i);//divide a los perris segun la cantidad que queremos mostrar
  }

  //detecta en que index contar la pagina
  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = dogsToShow.slice(indexOfFirstItem, indexOfLastItem)//los items que se muestran

  //renderiza cada uno de los numeros de pagina necesarios
  let renderPageNumbers = PAGES.map((number) => {
    if (number > minPageNumberLimits && number < maxPageNumberLimits + 1) {
      return (
        <li key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? styles.active : ''}>
          {number}
        </li>
      )
    } else {
      return null
    }
  })

  //boton para volver a la pag previa
  const handlePrevButton = () => {
    setCurrentPage(currentPage - 1) //setea la actual pagina en la anterior
    if ((currentPage - 1) % pageNumberLimits === 0) {
      setMaxPageNumberLimits(maxPageNumberLimits - pageNumberLimits)
      setMinPageNumberLimits(minPageNumberLimits - pageNumberLimits)
    }
  }
  //boton para ir a la sig. pagina
  const handleNextButton = () => {
    setCurrentPage(currentPage + 1)
    if (currentPage + 1 > maxPageNumberLimits) {
      setMaxPageNumberLimits(maxPageNumberLimits + pageNumberLimits)
      setMinPageNumberLimits(minPageNumberLimits + pageNumberLimits)
    }
  }
//Los increment nos sirver para saber a simple vista si hay mas paginas por ver
  let pageIncrementButton = null;
  if (PAGES.length > maxPageNumberLimits) {//&hellip unicode elipsis
    pageIncrementButton = <li onClick={handleNextButton}>&hellip;</li>
  }
  let pageDecrementButton = null;
  if (minPageNumberLimits >= 1) {
    pageDecrementButton = <li onClick={handlePrevButton}>&hellip;</li>
  }

  const handleLoadMore = () => {
    //le agrega un plus a los que se van a mostrar
    setitemsPerPage(itemsPerPage + 4)
  }


  return (
    <div>
      {console.log(currentItems),
        PaginationRender(currentItems)}
      <ul className={styles.pageNumbers}>
        <li>
          <button onClick={handlePrevButton}
            disabled={currentPage === PAGES[0] ? true : false}
          >Prev</button>
        </li>
        {pageDecrementButton}
        {renderPageNumbers}
        {pageIncrementButton}
        <li>
          <button onClick={handleNextButton}
            disabled={currentPage === PAGES[PAGES.length - 1] ? true : false}
          >Next</button>
        </li>
      </ul>
      <button onClick={handleLoadMore} className={styles.loadmore}>
        Load more
      </button>
    </div>
  )
}


export default function PaginationRender(items) {
  return (
    <div>
      {items?.map((dog) => {
        return (
          <div className={styles.cards} key={dog.id} >
            <NavLink exact to={`/dogs/details/${dog.id}`} className={styles.dogs}>
              {dog.image.url ? <img src={dog.image.url} alt='Not found' /> : <img src={dog.image} alt='Not found' />}
              {dog.name && <h1>{dog.name}</h1>}
              {dog.temperament && <p>{dog.temperament}</p>}
            </NavLink>
          </div>
        );
      })}
    </div>
  )
};