import React, {Component} from 'react';
import * as propTypes from "prop-types";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import TracksHeader from "./TracksHeader";
import TracksBody from "./TracksBody";
import TracksPagination from "./TracksPagination";

import {checkSavedSongs, moduleName as savedTracksModule} from "../../../ducks/SavedTracks";
import {urls} from "../../../config/utils";

class Tracks extends Component {
   state = {
      currentPage: 1,
      tracksPerPage: 10
   };

   componentDidUpdate(prevProps, prevState, snapshot) {
      const {savedTracks} = this.props;

      if (prevProps.savedTracks !== savedTracks) {
         localStorage.setItem('savedTracks', JSON.stringify(savedTracks));
      }
   }

   componentDidMount() {
      if (this.props.to === urls.savedTracks.path) {
         const savedTracks = localStorage.getItem('savedTracks');

         if (savedTracks) {
            this.props.checkSavedSongs(
               JSON.parse(savedTracks)
            );
         }
      }
   }

   paginate = pageNumber => this.setState({
      currentPage: pageNumber
   });

   render() {
      const {currentPage, tracksPerPage} = this.state;
      const {title, tracks, paginationVisible, customTracksPerPage, to} = this.props;
      const totalTrackPerPage = customTracksPerPage ? customTracksPerPage : tracksPerPage;

      const indexOfLastTrack = currentPage * totalTrackPerPage;
      const indexOfFirstTrack = indexOfLastTrack - totalTrackPerPage;
      const currentTracks = tracks && tracks.slice(indexOfFirstTrack, indexOfLastTrack);
      const totalPages = Math.ceil(tracks && tracks.length / totalTrackPerPage);

      const passedTracks = paginationVisible ? currentTracks : tracks;

      return (
         <section className="tracks-section">
            <h2 className="tracks-title section-title responsive-wrapper">
               <Link to={to}>
                  {title}

                  <ChevronRightIcon/>
               </Link>
            </h2>

            <div className="tracks-box">
               <TracksHeader/>
               <TracksBody tracks={passedTracks ? passedTracks : Array.from(new Array(totalTrackPerPage))}/>
               <TracksPagination paginationVisible={tracks && tracks.length > tracksPerPage && paginationVisible}
                                 totalPages={totalPages} paginate={this.paginate}/>
            </div>
         </section>
      )
   }
}

Tracks.propTypes = {
   savedTracks: propTypes.array,
   checkSavedSongs: propTypes.func.isRequired
};

export default connect((state) => ({
   savedTracks: state[savedTracksModule].savedTracks
}), {
   checkSavedSongs
})(Tracks);
