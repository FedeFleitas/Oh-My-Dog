import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import styles from './CreateDog.module.css';
import { getTemperaments } from '../../actions'
import {validate} from "./validation"

export default function CreateDog() {
  //global state  
  const temperaments = useSelector(state => state.temperaments)

  //local states
  const [input, setInput] = useState({
    name: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    life_span: '',
    image: ''
  })
  const [errors, setErrors] = useState({});
  const [temptsState, setTemptsState] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTemperaments())
  }, [])

  useEffect(() => {
    var tempts = []
    if (temperaments.length) {
      for (let i = 0; i < temperaments.length; i++) {
        tempts.push({ id: i, name: temperaments[i], checked: false })
      }
    }
    setTemptsState(tempts)
  }, [temperaments])

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value
      }));
  }

  const handleCheckChange = (e) => {
    var checkName = e.target.name
    console.log("Check: ", checkName)
    for (let i = 0; i < temptsState.length; i++) {
      if (temptsState[i].name === checkName) {
        if (temptsState[i].checked === false) {
          temptsState[i].checked = true
        }
        else {
          temptsState[i].checked = false
        }
      }
    }
    console.log("tempState: ",temptsState)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    var selected = []
    for (let i = 0; i < temptsState.length; i++) {
      if (temptsState[i].checked === true) selected.push(temptsState[i].id)
    }
  console.log("selected: ", selected)

    let totalHeight = `${input.minHeight} - ${input.maxHeight}`
    let totalWeight = `${input.minWeight} - ${input.maxWeight}`

    const createdDog = {
      name: input.name,
      height: totalHeight,
      weight: totalWeight,
      life_span: input.life_span + ' years',
      image: input.image,
      temperament: selected.join(', '),
    }

    if (Object.keys(errors).length > 0) return alert('Something went wrong. Please make sure all fields are filled in correctly');
    if (!selected.length) return alert('Should choose at least one temperament!');

    console.log("perro creado al back: ", createdDog)
    await axios.post("http://localhost:3001/dog", createdDog);

    temptsState.map(e => e.checked === true ? e.checked = false : null)
    
    setInput({
      name: '',
      minHeight: '',
      maxHeight: '',
      minWeight: '',
      maxWeight: '',
      life_span: '',
      image: ''
    })

    alert("Your Dog has been created successfully!");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>

      <div className={styles.input} >
          <label>Name</label>
          <input type="text" name="name"
            id="name" value={input.name}
            onChange={handleInputChange} />
          {errors.name && (<div className={styles.error} ><p className={styles.p} >{errors.name}</p></div>)}
        </div>

        <div className={styles.input} >
          <label>Min height</label>
          <input type="number" id="minHeight"
                 name="minHeight" value={input.minHeight}
                 onChange={handleInputChange} />
          {errors.minHeight && (<div className={styles.error} ><p className={styles.p} >{errors.minHeight}</p></div>)}
         
          <label>Max height</label>
          <input type="number" id="maxHeight"
                 name="maxHeight" value={input.maxHeight}
                 onChange={handleInputChange} />
          {errors.maxHeight && (<div className={styles.error} ><p className={styles.p} >{errors.maxHeight}</p></div>)}
        </div>

        <div className={styles.input} >
          <label>Min weight</label>
          <input type="number" id="minWeight"
                 name="minWeight" value={input.minWeight}
                 onChange={handleInputChange} />
          {errors.minWeight && (<div className={styles.error} ><p className={styles.p} >{errors.minWeight}</p></div>)}

          <label>Max weight</label>
          <input type="number" id="maxWeight" 
                 name="maxWeight" value={input.maxWeight}
                 onChange={handleInputChange} />
          {errors.maxWeight && (<div className={styles.error} ><p className={styles.p} >{errors.maxWeight}</p></div>)}
        </div>

        <div className={styles.input} >
          <label>Life Span</label>
          <input type="number" id="life_span"
                 name="life_span" value={input.life_span} 
                 onChange={handleInputChange} /> years
          {errors.life_span && (<div className={styles.error} ><p className={styles.p} >{errors.life_span}</p></div>)}
        </div>
        
        <div>
          <label>URL Image:</label>
          <input
            className={`${styles.image}`}
            type="text" id='image' name="image"
            placeholder="https://dogs.com/image/yourdogpicture.jpg"
            value={input.image}
            onChange={handleInputChange}
          />
          {errors.image && (<p className={styles.danger}>{errors.image}</p>)}
        </div>
        <br />
        <div className={styles.allTemps}>
              <label>Temperaments:</label>
        {
          temperaments?.map((temp, index) => (
            <div key={index}>
              <input className={styles.temperaments}
                type="checkbox"
                name={temp}
                onChange={handleCheckChange}
                value={input.temperaments} />
              <label>{temp}</label>
            </div>
          ))
        }
        </div>
        {errors.temperaments && (<p className={styles.danger}>{errors.temperaments}</p>)}

        <br />

      { Object.keys(errors).length > 0 || input.name.length === 0
        ?  <button type="submit" disabled={true} >Create your Dog!</button> 
        : <div>
            <button 
              type="submit"
              id="submit"
              className={styles.button}>Create your Dog!</button>
          </div> 
      }
      </div>
    </form>
  )
}

