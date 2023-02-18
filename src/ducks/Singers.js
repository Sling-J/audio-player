import {appName} from "../config/config";
import {fetchRequest} from "../config/utils";
import {Player} from "../config/service";

/**
 * Constants
 */

export const moduleName = 'singers';
const prefix = `${appName}/${moduleName}`;

export const LOAD_SINGER_REQUEST = `${prefix}/LOAD_SINGER_REQUEST`;
export const LOAD_SINGER_SUCCESS = `${prefix}/LOAD_SINGER_SUCCESS`;
export const LOAD_SINGER_FAILURE = `${prefix}/LOAD_SINGER_FAILURE`;

export const initialState = {
   loadingOfSingers: false,
   errorOfSingers: null,
   singers: [],
};

/**
 * Reducer
 */

export default (state = initialState, action) => {
   switch (action.type) {
      case LOAD_SINGER_REQUEST:
         return {
            ...state,
            loadingOfSingers: true,
            errorOfSingers: null
         };

      case LOAD_SINGER_SUCCESS:
         return {
            ...state,
            loadingOfSingers: false,
            singers: action.payload,
            errorOfSingers: null
         };

      case LOAD_SINGER_FAILURE:
         return {
            ...state,
            loadingOfSingers: false,
            errorOfSingers: action.error,
            singers: null
         };

      default:
         return state
   }
};

/**
 * Action
 */

export const fetchSingers = () => fetchRequest(
   Player.fetchSingers,
   LOAD_SINGER_REQUEST,
   LOAD_SINGER_SUCCESS,
   LOAD_SINGER_FAILURE
);
