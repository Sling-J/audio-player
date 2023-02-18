import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

import popularTracksReducer, {moduleName as popularTracksModule} from "../ducks/PopularTracks";
import savedTracksReducer, {moduleName as savedTracksModule} from "../ducks/SavedTracks";
import bestTracksReducer, {moduleName as bestTracksModule} from "../ducks/BestTracks";
import newTracksReducer, {moduleName as newTracksModule} from "../ducks/NewTracks";
import singersReducer, {moduleName as singersModule} from "../ducks/Singers";
import playerReducer, {moduleName as playerModule} from "../ducks/Player";
import genresReducer, {moduleName as genresModule} from "../ducks/Genres";
import authReducer, {moduleName as authModule} from "../ducks/Auth";

export default history => combineReducers({
   router: connectRouter(history),
   [popularTracksModule]: popularTracksReducer,
   [savedTracksModule]: savedTracksReducer,
   [bestTracksModule]: bestTracksReducer,
   [newTracksModule]: newTracksReducer,
   [singersModule]: singersReducer,
   [playerModule]: playerReducer,
   [genresModule]: genresReducer,
   [authModule]: authReducer
});
