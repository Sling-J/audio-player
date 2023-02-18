import {appName} from "../config/config";
import {fetchRequest} from "../config/utils";
import {Player} from "../config/service";

/**
 * Constants
 */

export const moduleName = 'genres';
const prefix = `${appName}/${moduleName}`;

export const LOAD_GENRES_REQUEST = `${prefix}/LOAD_GENRES_REQUEST`;
export const LOAD_GENRES_SUCCESS = `${prefix}/LOAD_GENRES_SUCCESS`;
export const LOAD_GENRES_FAILURE = `${prefix}/LOAD_GENRES_FAILURE`;

export const initialState = {
   loadingOfGenres: false,
   errorOfGenres: null,
   genres: [],
};

/**
 * Reducer
 */

export default (state = initialState, action) => {
   switch (action.type) {
      case LOAD_GENRES_REQUEST:
         return {
            ...state,
            loadingOfGenres: true,
            errorOfGenres: null
         };

      case LOAD_GENRES_SUCCESS:
         return {
            ...state,
            loadingOfGenres: false,
            genres: action.payload,
            errorOfGenres: null
         };

      case LOAD_GENRES_FAILURE:
         return {
            ...state,
            loadingOfGenres: false,
            errorOfGenres: action.error,
            genres: null
         };

      default:
         return state;
   }
};


/**
 * Actions
 */

export const fetchGenres = () => fetchRequest(
   Player.fetchGenres,
   LOAD_GENRES_REQUEST,
   LOAD_GENRES_SUCCESS,
   LOAD_GENRES_FAILURE
);
