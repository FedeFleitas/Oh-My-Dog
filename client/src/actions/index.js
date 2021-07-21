import axios from 'axios'

export const GET_DOGS = 'GET_DOGS', GET_TEMPERAMENTS = 'GET_TEMPERAMENTS', GET_DOG_DETAILS = 'GET_DOG_DETAILS', ORDER_AL = 'ORDER_AL', FILTER_DOGS = 'FILTER_DOGS';


export let getDogs = (dog) => {

    return (dispatch) => {
        let url = 'http://localhost:3001/dogs';
        if (dog) {
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

    return function (dispatch) {
        dispatch({
            type: GET_DOG_DETAILS,
            payload: id
        });
    };
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

export let getAZ = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3001/dogs')
            .then((resp) => {
                const order = resp.data.sort((a, b) => {
                    if (a.name > b.name) return 1
                    if (a.name < b.name) return -1
                    return 0;
                })
                dispatch({
                    type: ORDER_AL,
                    payload: order
                })
            })

    }
};

export let getZA = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3001/dogs')
            .then((resp) => {
                const order = resp.data.sort((b, a) => {
                    if (a.name > b.name) return 1
                    if (a.name < b.name) return -1
                    return 0;
                })
                dispatch({
                    type: ORDER_AL,
                    payload: order
                })
            })
    }
};
export let getSource = (value) => {
    if (value === "DB") {
        return {
            type: "DB",
        };
    } else if (value === "API") {
        return {
            type: "API",
        };
    } else if (value === "ALL") {
        return {
            type: "ALL",
        };
    }
}

