import React from 'react';
import * as propTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import Fab from "@material-ui/core/Fab";
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import ActionButton from "./ActionButton";
import CheckAuth, {Authorized, Unauthorized} from "../CheckAuth";

import {stopSong, moduleName as playerModule} from "../../../ducks/Player";
import {moduleName as authModule} from "../../../ducks/Auth";
import {urls} from "../../../config/utils";

const DesktopTracks = ({
   activeClass, index, isPlaying,
   currentTrackIndex, track, playSelectedSong,
   stopSong, isAuth
}) => (
   <div className={`tracks-box__row flex j-sb flex-align-center ${activeClass}`}>
      <div className="tracks-box__cell">
         <p className="tracks-box-cell__id">{index + 1}</p>

         <Fab href="" className="tracks-box__play"
            onClick={() => (isPlaying && currentTrackIndex !== track.id - 1) ? playSelectedSong(isAuth, track.id - 1) :
               (isPlaying) ? stopSong() : playSelectedSong(isAuth, track.id - 1)
            }
         >
            {currentTrackIndex === track.id - 1 && isPlaying ?
               <PauseIcon className="tracks-box-play__icon" fontSize="inherit"/> :
               <PlayArrowIcon className="tracks-box-play__icon" fontSize="inherit"/>
            }

            <div className="tracks-box-active__pulse animation-pulse">
               <div className="ringring ring"/>
               <div className="circle cir"/>
            </div>
         </Fab>
      </div>

      <p className="tracks-box__cell">{track.songName}</p>
      <p className="tracks-box__cell"><Link to={`${urls.artists.path}/${track.singerId}`}>{track.singer}</Link></p>

      <div className="tracks-box__cell">
         <CheckAuth>
            <Authorized>
               <ActionButton
                  className="tracks-box-cell__add"
                  size="small"
                  track={track}
               />
            </Authorized>

            <Unauthorized/>
         </CheckAuth>
      </div>
   </div>
);

DesktopTracks.propTypes = {
   currentTrackIndex: propTypes.number.isRequired,
   isPlaying: propTypes.bool.isRequired,
   isAuth: propTypes.bool.isRequired,
   activeClass: propTypes.string,
   index: propTypes.number,
   track: propTypes.object,

   playSelectedSong: propTypes.func.isRequired,
   stopSong: propTypes.func.isRequired,
};

export default connect((state) => ({
   currentTrackIndex: state[playerModule].currentTrackIndex,
   isPlaying: state[playerModule].isPlaying,
   isAuth: state[authModule].isAuth
}), {
   stopSong
})(DesktopTracks);
