import React, {Fragment} from 'react';
import * as propTypes from 'prop-types';
import {connect} from 'react-redux';

import Header from "../Ui/Header/Header";
import Tracks from "../Ui/Tracks/Tracks";

import {moduleName as playerModule} from "../../ducks/Player";
import {moduleName as newTracksModule} from "../../ducks/NewTracks";
import {moduleName as bestTracksModule} from "../../ducks/BestTracks";
import {moduleName as savedTracksModule} from "../../ducks/SavedTracks";
import {moduleName as popularTracksModule} from "../../ducks/PopularTracks";
import {urls} from "../../config/utils";

const ItemTracks = ({
   item, allTracks, newTracks,
   bestTracks, popularTracks,
   currentTrackIndex, savedTracks,
}) => {
   const page = item.path === urls.savedTracks.path ? 'profile' : '';

   const tracks =
      item.path === urls.savedTracks.path ? savedTracks :
      item.path === urls.allTracks.path ? allTracks :
      item.path === urls.newTracks.path ? newTracks :
      item.path === urls.bestTracks.path ? bestTracks :
      item.path === urls.popularTracks.path ? popularTracks : null;

   const isObjItem = item.path === urls.savedTracks.path ?
      'Нурел' :
      allTracks && allTracks[currentTrackIndex];

   return (
      <Fragment>
         <Header isObj={isObjItem} page={page}/>
         <Tracks tracks={tracks} title={item.name} paginationVisible to={item.path}/>
      </Fragment>
   )
};

ItemTracks.propTypes = {
   savedTracks: propTypes.arrayOf(propTypes.object).isRequired,
   allTracks: propTypes.arrayOf(propTypes.object),
   newTracks: propTypes.arrayOf(propTypes.object),
   bestTracks: propTypes.arrayOf(propTypes.object),
   popularTracks: propTypes.arrayOf(propTypes.object),
   loadingOfTracks: propTypes.bool.isRequired,
   loadingOfNewTracks: propTypes.bool.isRequired,
   loadingOfBestTracks: propTypes.bool.isRequired,
   loadingOfSavedTracks: propTypes.bool.isRequired,
   loadingOfPopularTracks: propTypes.bool.isRequired,
   currentTrackIndex: propTypes.number.isRequired,
};

export default connect((state) => ({
   currentTrackIndex: state[playerModule].currentTrackIndex,
   savedTracks: state[savedTracksModule].savedTracks,
   allTracks: state[playerModule].allTracks,
   newTracks: state[newTracksModule].newTracks,
   bestTracks: state[bestTracksModule].bestTracks,
   popularTracks: state[popularTracksModule].popularTracks,
   loadingOfTracks: state[playerModule].loadingOfTracks,
   loadingOfSavedTracks: state[savedTracksModule].loadingOfSavedTracks,
   loadingOfNewTracks: state[newTracksModule].loadingOfNewTracks,
   loadingOfBestTracks: state[bestTracksModule].loadingOfBestTracks,
   loadingOfPopularTracks: state[popularTracksModule].loadingOfPopularTracks,
}))(ItemTracks);
