import { GET_DOGS, GET_DOG_DETAILS, FILTER_DOGS, GET_TEMPERAMENTS } from '../actions/index.js';

const initialState = {
  dogsToShow: [],
  searchedDogs:[],
  dogDetails: [],
  temperaments: [],
};

export default function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_DOGS:
          return {
              ...state,
              dogsToShow: action.payload
        }
        case GET_DOG_DETAILS:
          let found = state.dogsToShow.filter((element) => element.id === Number(action.payload));
          return {
            ...state,
            dogDetails: found[0]
        }
        case FILTER_DOGS:
          return {
            ...state,
            movieDetail: action.payload
        }
        case GET_TEMPERAMENTS:
          return {
            ...state,
            moviesFavourites: state.moviesFavourites.filter(movie => movie.imdbID !== action.payload)            
        }
    
        default:
            return { 
            ...state
            };
    }
}