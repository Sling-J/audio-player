import {appName} from "../config/config";

/**
 * Constants
 */

export const moduleName = 'saved-tracks';
const prefix = `${appName}/${moduleName}`;

export const CHECK_SAVED_SONGS = `${prefix}/CHECK_SAVED_SONGS`;
export const SAVE_SONG = `${prefix}/SAVE_SONG`;
export const REMOVE_SONG = `${prefix}/REMOVE_SONG`;

export const initialState = {
   loadingOfSavedTracks: false,
   savedTracks: [],
};

/**
 * Reducer
 */

export default (state = initialState, action) => {
   switch (action.type) {
      case CHECK_SAVED_SONGS:
         return {
            ...state,
            savedTracks: action.payload
         };

      case SAVE_SONG:
         return {
            ...state,
            savedTracks: [
               ...state.savedTracks,
               action.payload
            ]
         };

      case REMOVE_SONG:
         const savedTracks = state.savedTracks.filter(({id}) => id !== action.payload.id);

         return {
            ...state,
            savedTracks
         };

      default:
         return state;
   }
};

/**
 * Actions
 */

export const saveSong = track => ({
   type: SAVE_SONG,
   payload: track
});

export const removeSong = track => ({
   type: REMOVE_SONG,
   payload: track
});

export const checkSavedSongs = savedSongs => ({
   type: CHECK_SAVED_SONGS,
   payload: savedSongs
});
