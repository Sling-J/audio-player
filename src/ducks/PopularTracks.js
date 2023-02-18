import {appName} from "../config/config";
import {fetchRequest} from "../config/utils";
import {Player} from "../config/service";

/**
 * Constants
 */

export const moduleName = 'popularTracks';
const prefix = `${appName}/${moduleName}`;

export const LOAD_POPULAR_SONGS_REQUEST = `${prefix}/LOAD_POPULAR_SONGS_REQUEST`;
export const LOAD_POPULAR_SONGS_SUCCESS = `${prefix}/LOAD_POPULAR_SONGS_SUCCESS`;
export const LOAD_POPULAR_SONGS_ERROR = `${prefix}/LOAD_POPULAR_SONGS_ERROR`;

export const initialState = {
   loadingOfPopularTracks: false,
   errorOfPopularTracks: null,
   popularTracks: null,
};

/**
 * Reducer
 */

export default (state = initialState, action) => {
   switch (action.type) {
      case LOAD_POPULAR_SONGS_REQUEST:
         return {
            ...state,
            loadingOfPopularTracks: true,
            errorOfPopularTracks: null
         };

      case LOAD_POPULAR_SONGS_SUCCESS:
         return {
            ...state,
            loadingOfPopularTracks: false,
            errorOfPopularTracks: null,
            popularTracks: action.payload
         };

      case LOAD_POPULAR_SONGS_ERROR:
         return {
            ...state,
            loadingOfPopularTracks: false,
            popularTracks: null,
            errorOfPopularTracks: action.error
         };

      default:
         return state;
   }
};

/**
 * Actions
 */

export const fetchPopularTracks = () => fetchRequest(
   Player.fetchPopularTracks,
   LOAD_POPULAR_SONGS_REQUEST,
   LOAD_POPULAR_SONGS_SUCCESS,
   LOAD_POPULAR_SONGS_ERROR
);
