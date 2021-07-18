import axios from 'axios'

export const GET_DOGS = 'GET_DOGS', GET_TEMPERAMENTS = 'GET_TEMPERAMENTS',GET_DOG_DETAILS='GET_DOG_DETAILS', FILTER_DOGS = 'FILTER_DOGS';


export let getDogs = (dog) => {
    
    return (dispatch) => {
        let url = 'http://localhost:3001/dogs';
        if(dog){
            url = `http://localhost:3001/dogs?name=${dog}`
        }
        return axios.get(url)
        .then((dogRes) => {
            dispatch({
                type: GET_DOGS,
                payload: dogRes.data
            });
        });
    }    
  
}

export let getDogDetails = (id) => {
    return {
        type: GET_DOG_DETAILS,
        payload: id
    }
}

export function getTemperaments() {
    return (dispatch) => {
        return axios.get('http://localhost:3001/temperaments')
        .then((temps) => {
            dispatch({
                type: GET_TEMPERAMENTS,
                payload: temps.data
            });
        });
    }
}

export let filterDogs = (payload) => {
    return {
        type: FILTER_DOGS,
        payload
    };
};

