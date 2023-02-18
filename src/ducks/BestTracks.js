import {appName} from "../config/config";
import {fetchRequest} from "../config/utils";
import {Player} from "../config/service";

/**
 * Constants
 */

export const moduleName = 'best-tracks';
const prefix = `${appName}/${moduleName}`;

export const LOAD_BEST_SONGS_REQUEST = `${prefix}/LOAD_BEST_SONGS_REQUEST`;
export const LOAD_BEST_SONGS_SUCCESS = `${prefix}/LOAD_BEST_SONGS_SUCCESS`;
export const LOAD_BEST_SONGS_FAILURE = `${prefix}/LOAD_BEST_SONGS_FAILURE`;

export const initialState = {
   loadingOfBestTracks: false,
   errorOfBestTracks: null,
   bestTracks: null,
};

/**
 * Reducer
 */

export default (state = initialState, action) => {
   switch (action.type) {
      case LOAD_BEST_SONGS_REQUEST:
         return {
            ...state,
            loadingOfBestTracks: true,
            errorOfBestTracks: null
         };

      case LOAD_BEST_SONGS_SUCCESS:
         return {
            ...state,
            loadingOfBestTracks: false,
            errorOfBestTracks: null,
            bestTracks: action.payload
         };

      case LOAD_BEST_SONGS_FAILURE:
         return {
            ...state,
            loadingOfBestTracks: false,
            bestTracks: null,
            errorOfBestTracks: action.error
         };

      default:
         return state
   }
};

/**
 * Actions
 */

export const fetchBestTracks = () => fetchRequest(
   Player.fetchBestTracks,
   LOAD_BEST_SONGS_REQUEST,
   LOAD_BEST_SONGS_SUCCESS,
   LOAD_BEST_SONGS_FAILURE
);
