import { GET_DOGS, GET_DOG_DETAILS, GET_TEMPERAMENTS, ORDER_AL } from '../actions/index.js';

const initialState = {
  dogsToShow: [],
  filtered: [],
  temperaments: [],
  dogDetails: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      if (Array.isArray(action.payload[0])){  let pay = [...action.payload];
        pay.map((dog) => {
          if (!dog.image && dog.reference_image_id) {
            let image_id = dog.reference_image_id;
            dog.image = `https://cdn2.thedogapi.com/images/${image_id}.jpg`
          } else if (!dog.image && !dog.reference_image_id) {
            dog.image = `https://icon-library.com/images/not-found-icon/not-found-icon-4.jpg`
          }
        });}
      return {
        ...state,
        dogsToShow: action.payload
      }

    case GET_DOG_DETAILS:
      let found = state.dogsToShow.filter((element) => element.id === Number(action.payload) || element.id === action.payload);
      return {
        ...state,
        dogDetails: found
      }

    case ORDER_AL:
      return {
        ...state,
        dogsToShow: action.payload
      }

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload
      }

    case "DB":
      return {
        ...state,
        filter: state.dogsToShow.filter(b => b.id.length > 6).sort()
      }
    case "API":
      return {
        ...state,
        filter: state.dogsToShow.filter(b => b.id < 500).sort()
      }
    case "ALL":
      return {
        ...state,
        filter: state.dogsToShow
      }

    default:
      return {
        ...state
      };
  }
}