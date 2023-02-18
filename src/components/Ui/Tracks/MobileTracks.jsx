import React from 'react';
import * as propTypes from "prop-types";
import {connect} from 'react-redux';

import PauseIcon from '@material-ui/icons/Pause';
import Button from "@material-ui/core/Button";

import ActionButton from "./ActionButton";
import CheckAuth, {Authorized, Unauthorized} from "../CheckAuth";

import {stopSong, moduleName as playerModule} from "../../../ducks/Player";
import {moduleName as authModule} from "../../../ducks/Auth";

const MobileTracks = ({
   activeClass, isPlaying, track,
   currentTrackIndex, playSelectedSong,
   stopSong, isAuth
}) => {

   return (
      <div className="flex j-sb flex-align-center">
         <Button
            className={`responsive-track-box__item ${activeClass}`}
            onClick={() => (isPlaying && currentTrackIndex !== track.id - 1) ? playSelectedSong(isAuth, track.id - 1) :
               (isPlaying) ? stopSong() : playSelectedSong(isAuth, track.id - 1)
            }
            href=""
         >
            <div className="flex flex-align-center">
               <div
                  className="responsive-track-box-item__img flex flex-align-center j-center"
                  style={{background: `#e6edf5 url(/tracks-data/album-picture/sm/${track.albumPicture})`}}
               >
                  <div
                     className={((currentTrackIndex === track.id - 1 && isPlaying) || (activeClass)) && 'responsive-track-box-item-img__overlay'}
                  />

                  {(currentTrackIndex === track.id - 1 && isPlaying) ?
                     <div className="responsive-tracks-box-active__pulse animation-pulse">
                        <div className="res-ringring ring"/>
                        <div className="res-circle cir"/>
                     </div> :
                     (activeClass) ?
                        <PauseIcon className="responsive-track-box-item__icon"/> : null
                  }
               </div>

               <div className="responsive-track-box-item__desc">
                  <p className="responsive-track-box-item-desc__title">{track.songName}</p>
                  <p className="responsive-track-box-item-desc__singer">{track.singer}</p>
               </div>
            </div>
         </Button>

         <CheckAuth>
            <Authorized>
               <div>
                  <ActionButton track={track}/>
               </div>
            </Authorized>

            <Unauthorized/>
         </CheckAuth>
      </div>
   )
};

MobileTracks.propTypes = {
   currentTrackIndex: propTypes.number.isRequired,
   isPlaying: propTypes.bool.isRequired,
   isAuth: propTypes.bool.isRequired,
   activeClass: propTypes.string,
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
})(MobileTracks);
