import React, {useState} from 'react';
import * as propTypes from "prop-types";
import {connect} from 'react-redux';

import Tracks from "../Ui/Tracks/Tracks";

import {moduleName as newTracksModule} from "../../ducks/NewTracks";
import {moduleName as bestTracksModule} from "../../ducks/BestTracks";
import {moduleName as popularTracksModule} from "../../ducks/PopularTracks";
import {urls} from "../../config/utils";

const HomeTracksBox = ({
   newTracks, bestTracks, popularTracks,
   loadingOfNewTracks, loadingOfBestTracks,
   loadingOfPopularTracks
}) => {
   const [tracksPerPage] = useState(5);

   const slicedNewTracks = newTracks && newTracks.slice(1, 8);
   const slicedBestTracks = bestTracks && bestTracks.slice(1, 8);
   const slicedPopularTracks = popularTracks && popularTracks.slice(1, 8);

   return (
      <div className="home-tracks-box">
         <div className="home-tracks-box__line">
            <Tracks
               title={urls.newTracks.name}
               loading={loadingOfNewTracks}
               tracks={slicedNewTracks}
               customTracksPerPage={tracksPerPage}
               to={urls.newTracks.path}
            />
         </div>

         <div className="home-tracks-box__line">
            <Tracks
               title={urls.bestTracks.name}
               loading={loadingOfBestTracks}
               tracks={slicedBestTracks}
               customTracksPerPage={tracksPerPage}
               to={urls.bestTracks.path}
            />
         </div>

         <div className="home-tracks-box__line">
            <Tracks
               title={urls.popularTracks.name}
               loading={loadingOfPopularTracks}
               tracks={slicedPopularTracks}
               customTracksPerPage={tracksPerPage}
               to={urls.popularTracks.path}
            />
         </div>
      </div>
   );
};

HomeTracksBox.propTypes = {
   newTracks: propTypes.arrayOf(propTypes.object),
   bestTracks: propTypes.arrayOf(propTypes.object),
   popularTracks: propTypes.arrayOf(propTypes.object),
   loadingOfNewTracks: propTypes.bool.isRequired,
   loadingOfBestTracks: propTypes.bool.isRequired,
   loadingOfPopularTracks: propTypes.bool.isRequired
};

export default connect((state) => ({
   newTracks: state[newTracksModule].newTracks,
   bestTracks: state[bestTracksModule].bestTracks,
   popularTracks: state[popularTracksModule].popularTracks,
   loadingOfNewTracks: state[newTracksModule].loadingOfNewTracks,
   loadingOfBestTracks: state[bestTracksModule].loadingOfBestTracks,
   loadingOfPopularTracks: state[popularTracksModule].loadingOfPopularTracks,
}))(HomeTracksBox);
