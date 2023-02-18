import React from 'react';
import * as propTypes from "prop-types";
import {connect} from 'react-redux';

import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import Skeleton from "@material-ui/lab/Skeleton";
import MobileTracks from "./MobileTracks";
import DesktopTracks from "./DesktopTracks";

import {selectSong, playSong, moduleName as playerModule} from "../../../ducks/Player";
import {moduleName as authModule} from "../../../ducks/Auth";

const TracksBody = ({tracks, isPlaying, currentTrackIndex, selectSong, playSong}) => {
   const matches = useMediaQuery('(max-width: 572px)');

   const playSelectedSong = (isAuth, i) => {
      selectSong(i);
      return playSong(isAuth, 'Авторизуйтесь для прослушивания треков');
   };

   return (
      <div className="tracks-box__body">
         {tracks.map((track, i) => {
            if (track) {
               const activeClass =
                  (currentTrackIndex === track.id - 1 && isPlaying) ? 'tracks-box__active__playing' :
                     (currentTrackIndex === track.id - 1 && !isPlaying) ? 'tracks-box__active' : '';

               return matches ? (
                  <MobileTracks
                     key={i}
                     index={i}
                     activeClass={activeClass}
                     track={track}
                     playSelectedSong={playSelectedSong}
                  />
               ) : (
                  <DesktopTracks
                     key={i}
                     index={i}
                     activeClass={activeClass}
                     track={track}
                     playSelectedSong={playSelectedSong}
                  />
               )
            } else {
               return <Skeleton className="tracks-box__dimmer" key={i}/>
            }
         })}
      </div>
   );
};

TracksBody.propTypes = {
   tracks: propTypes.arrayOf(propTypes.object),
   isAuth: propTypes.bool.isRequired,
   isPlaying: propTypes.bool.isRequired,
   currentTrackIndex: propTypes.number.isRequired,

   selectSong: propTypes.func.isRequired,
   playSong: propTypes.func.isRequired,
};

export default connect((state) => ({
   currentTrackIndex: state[playerModule].currentTrackIndex,
   isPlaying: state[playerModule].isPlaying,
   isAuth: state[authModule].isAuth,
}), {
   selectSong,
   playSong
})(TracksBody);
