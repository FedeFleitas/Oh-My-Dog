import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getDogDetails } from '../../actions';
import styles from './DogDetails.module.css';



export default function DogDetails({ match }) {
  console.log(match)
  const dispatch = useDispatch()
  const dogDetailsState = useSelector(state => state.dogDetails);

  const [foundDog, setFoundDog] = useState(false)

  useEffect(() => {
    dispatch(getDogDetails(match.params.id))
  }, [dispatch])

  console.log("state: ", dogDetailsState)
  
  useEffect(() => {

    if (dogDetailsState.id) {
      if(dogDetailsState.id === Number(match.params.id)) {
        setFoundDog(true) 
      }
    }
  }, [dogDetailsState]);

  return (
    <div className={styles.dogDetailsPage}>
      <div className={styles.dogDetails}>
        <NavLink exact to="/dogs" className={styles.button}>X</NavLink>
        {foundDog && <div>
          {dogDetailsState.image && <img src={dogDetailsState.image.url} alt={`${dogDetailsState.name}`}/>}
          <h1>{dogDetailsState.name}</h1>
          {dogDetailsState.temperament && <h2>Temperament: {dogDetailsState.temperament}</h2>}
          <div className={styles.measures}>
            <div className={styles.weight}>
                <h2>Weight</h2>
                <select name="Weight">
                  {dogDetailsState.weight.imperial && <option value="1">{dogDetailsState.weight.imperial} Lbs.</option>}
                  {dogDetailsState.weight.metric && <option value="2">{dogDetailsState.weight.metric} Kg</option>}
                </select>
            </div>
            <div className={styles.height}>
              <h2>Height</h2>
              <select name="Height">
                {dogDetailsState.weight.imperial && <option value="1">{dogDetailsState.height.imperial} Lbs.</option>}
                {dogDetailsState.weight.metric && <option value="2">{dogDetailsState.height.metric} Kg</option>}
              </select>
            </div>
            </div>
          {dogDetailsState.life_span && <h3>Lifespan: {dogDetailsState.life_span}</h3>}
        </div>}
      </div>
    </div>
  )
};