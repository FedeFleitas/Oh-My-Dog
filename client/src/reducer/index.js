import { GET_DOGS, GET_DOG_DETAILS, GET_TEMPERAMENTS, FILTER_DOGS } from '../actions/index.js';

const initialState = {
  dogsToShow: [],
  searchedDogs: [],
  temperaments: [],
  dogDetails: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      action.payload.map((dog) => {
        if (!dog.image && dog.reference_image_id) {
          let image_id = dog.reference_image_id;
          dog.image = `https://cdn2.thedogapi.com/images/${image_id}.jpg`
        } else if(!dog.image && !dog.reference_image_id){
        dog.image = `https://icon-library.com/images/not-found-icon/not-found-icon-4.jpg`
        }
      });      
      return {
        ...state,
        dogsToShow: action.payload
      }

    case GET_DOG_DETAILS:
      let found = state.dogsToShow.filter((element) => element.id === Number(action.payload) || element.id === action.payload);
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
        temperaments: action.payload
      }
    default:
      return {
        ...state
      };
  }
}