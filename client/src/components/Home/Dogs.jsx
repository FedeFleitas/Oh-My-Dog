import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from '../../actions'
import styles from './Dogs.module.css';



export let Dogs = () => {
  //global states
  const dogsToShow = useSelector((state) => state.dogsToShow);
  const dispatch = useDispatch();
console.log(dogsToShow)
  //local states
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setitemsPerPage] = useState(8)

  const [maxPageNumberLimits, setMaxPageNumberLimits] = useState(5);
  const [minPageNumberLimits, setMinPageNumberLimits] = useState(0);
  const pageNumberLimits = 5;

  let handleClick = (event) => {
    setCurrentPage(Number(event.target.id))
  }

  useEffect(() => { dispatch(getDogs()) }, [dispatch])
  if(typeof dogsToShow[0] === 'string') return (<h1>Sorry, breed not found!</h1>);


  dogsToShow[0] && dogsToShow?.map((e) => {
    if (e.id.length > 4 && e.temperaments) {
      e.temperament = ""
      for (let i = 0; i < e.temperaments.length; i++) {
        e.temperament += e.temperaments[i].name.toString() + ", "
      }
    }
  })

  const PAGES = [];
  for (let i = 1; i <= Math.ceil(dogsToShow.length / itemsPerPage); i++) {
    PAGES.push(i);
  }

  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = dogsToShow.slice(indexOfFirstItem, indexOfLastItem)

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

/*   useEffect(() => {
    dispatch(getDogs())
  }, [dispatch]) */


  const handlePrevButton = () => {
    setCurrentPage(currentPage - 1)
    if ((currentPage - 1) % pageNumberLimits === 0) {
      setMaxPageNumberLimits(maxPageNumberLimits - pageNumberLimits)
      setMinPageNumberLimits(minPageNumberLimits - pageNumberLimits)
    }
  }
  const handleNextButton = () => {
    setCurrentPage(currentPage + 1)
    if (currentPage + 1 > maxPageNumberLimits) {
      setMaxPageNumberLimits(maxPageNumberLimits + pageNumberLimits)
      setMinPageNumberLimits(minPageNumberLimits + pageNumberLimits)
    }
  }

  let pageIncrementButton = null;
  if (PAGES.length > maxPageNumberLimits) {
    pageIncrementButton = <li onClick={handleNextButton}>&hellip;</li>
  }
  let pageDecrementButton = null;
  if (minPageNumberLimits >= 1) {
    pageDecrementButton = <li onClick={handlePrevButton}>&hellip;</li>
  }

  const handleLoadMore = () => {
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
          <div key={dog.id} className={styles.dogs}>
            <NavLink exact to={`/dogs/details/${dog.id}`}>
              {dog.name && <h1>{dog.name}</h1>}
              {dog.image.url ? <img src={dog.image.url} alt='Not found' /> : <img src={dog.image} alt='Not found' />}
              {dog.temperament && <p>{dog.temperament}</p>}
            </NavLink>
          </div>
        );
      })}
    </div>
  )
};