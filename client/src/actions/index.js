import axios from 'axios'

export const GET_DOGS = 'GET_DOGS', GET_DOG_DETAILS='GET_DOG_DETAILS', FILTER_DOGS = 'FILTER_DOGS', GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';


export let getDogs = (dog) => {
    if(dog){
        return (dispatch) => {
            return axios.get('http://localhost:3001/dogs?name=' + dog)
            .then((dogRes) => {
                console.log("response query: ", dogRes.data)
                dispatch({
                    type: GET_DOGS,
                    payload: dogRes.data
                });
            });
        }    
    } else {
        return (dispatch) => {
            return axios.get('http://localhost:3001/dogs')
            .then((dogs) => {
                dispatch({
                    type: GET_DOGS,
                    payload: dogs.data
                });
            });
        }
    }
}

export let getDogDetails = (id) => {
    return {
        type: GET_DOG_DETAILS,
        payload: id
    }
}

export let filterDogs = (payload) => {
    return {
        type: FILTER_DOGS,
        payload
    };
};

export let getTemperaments = () => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/temperaments`)
        .then((response) => {
          dispatch({type: GET_TEMPERAMENTS, payload: {json: response}});
        });
      } 
};
