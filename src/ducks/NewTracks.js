import {appName} from "../config/config";
import {fetchRequest} from "../config/utils";
import {Player} from "../config/service";

/**
 * Constants
 */

export const moduleName = 'new-tracks';
const prefix = `${appName}/${moduleName}`;

export const LOAD_NEW_SONGS_REQUEST = `${prefix}/LOAD_NEW_SONGS_REQUEST`;
export const LOAD_NEW_SONGS_SUCCESS = `${prefix}/LOAD_NEW_SONGS_SUCCESS`;
export const LOAD_NEW_SONGS_FAILURE = `${prefix}/LOAD_NEW_SONGS_FAILURE`;

export const initialState = {
   loadingOfNewTracks: false,
   errorOfNewTracks: null,
   newTracks: null,
};

/**
 * Reducer
 */

export default (state = initialState, action) => {
   switch (action.type) {
      case LOAD_NEW_SONGS_REQUEST:
         return {
            ...state,
            loadingOfNewTracks: true,
            errorOfNewTracks: null
         };

      case LOAD_NEW_SONGS_SUCCESS:
         return {
            ...state,
            loadingOfNewTracks: false,
            errorOfNewTracks: null,
            newTracks: action.payload
         };

      case LOAD_NEW_SONGS_FAILURE:
         return {
            ...state,
            loadingOfNewTracks: false,
            newTracks: null,
            errorOfNewTracks: action.error
         };

      default:
         return state;
   }
};


/**
 * Actions
 */

export const fetchNewTracks = () => fetchRequest(
   Player.fetchNewTracks,
   LOAD_NEW_SONGS_REQUEST,
   LOAD_NEW_SONGS_SUCCESS,
   LOAD_NEW_SONGS_FAILURE
);
