import React, {useState} from 'react';
import * as propTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import {audioImageNotFound} from "../../../assets/img";

// Components
import FastRewindIcon from '@material-ui/icons/FastRewind';
import FastForwardIcon from '@material-ui/icons/FastForward';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import AddIcon from '@material-ui/icons/Add';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import CheckAuth, {Authorized, Unauthorized} from "../CheckAuth";

import {moduleName as authModule} from "../../../ducks/Auth";
import {removeSong, saveSong, moduleName as savedTracksModule} from "../../../ducks/SavedTracks";
import {nextSong, playSong, prevSong, stopSong, moduleName as playerModule} from "../../../ducks/Player";
import {urls} from "../../../config/utils";

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
});

const PlayerTemplate = ({
   progressStyle, isAuth, progressDuration,
   allTracks, savedTracks, saveSong,
   removeSong, isPlaying, stopSong,
   playSong, nextSong, prevSong,
   currentTrackIndex, duration,
   audioToggleVolume, isVolume,
   classes
}) => {
   const matches = useMediaQuery('(max-width: 572px)');
   const [open, setOpen] = useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <div className={`player ${classes}`}>
         <div className="player-progress">
            <div className="player-progress__filled" style={progressStyle}/>
            <p className="player-progress__progress-duration">{progressDuration && progressDuration}</p>
            <p className="player-progress__duration">{duration && duration}</p>
         </div>

         <div className="player-box flex j-sb flex-align-center">
            <div className={`player-box__main flex flex-align-center ${!isAuth && 'unauthorized-player-box__main'}`}>
               <CheckAuth>
                  <Authorized>
                     <div className="mobile-player-box__add">
                        {allTracks && savedTracks.findIndex(item => item.id === allTracks[currentTrackIndex].id) === -1 ? (
                           <IconButton onClick={() => saveSong(allTracks[currentTrackIndex])} href="">
                              <AddIcon/>
                           </IconButton>
                        ) : (
                           <IconButton onClick={() => removeSong(allTracks[currentTrackIndex])} href="">
                              <RemoveCircleOutlineIcon/>
                           </IconButton>
                        )}
                     </div>
                  </Authorized>

                  <Unauthorized/>
               </CheckAuth>

               <div className="player-box__action flex flex-align-center">
                  <div>
                     <IconButton onClick={prevSong} href="">
                        <FastRewindIcon/>
                     </IconButton>
                  </div>
                  <div>
                     <IconButton onClick={() => {
                        return isPlaying ? stopSong() : playSong(isAuth, 'Авторизуйтесь для прослушивания треков');
                     }} href="">
                        {!isPlaying ? <PlayArrowIcon/> : <PauseIcon/>}
                     </IconButton>
                  </div>
                  <div>
                     <IconButton onClick={nextSong} href="">
                        <FastForwardIcon/>
                     </IconButton>
                  </div>
               </div>

               <div className="player-box__track flex flex-align-center" onClick={matches ? handleClickOpen : null}>
                  <div className="player-box-track__img">
                     <img
                        src={allTracks && allTracks[currentTrackIndex].albumPicture !== "" ? `/tracks-data/album-picture/sm/${allTracks[currentTrackIndex].albumPicture}` : audioImageNotFound}
                        alt="Track"
                     />
                  </div>
                  <div className="player-box-track__desc">
                     <p className="player-box-track__name">{allTracks && allTracks[currentTrackIndex].songName}</p>
                     <div className="player-box-track__singer">
                        {matches ? (
                           <p>{allTracks && allTracks[currentTrackIndex].singer}</p>
                        ) : (
                           <Link to={`${urls.artists.path}/${allTracks && allTracks[currentTrackIndex].singerId}`}>{allTracks && allTracks[currentTrackIndex].singer}</Link>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            <div className="player-box__change flex flex-align-center">
               <CheckAuth>
                  <Authorized>
                     <div className="player-box-change__add">
                        {allTracks && savedTracks.findIndex(item => item.id === allTracks[currentTrackIndex].id) === -1 ? (
                           <IconButton onClick={() => saveSong(allTracks[currentTrackIndex])} href="">
                              <AddIcon/>
                           </IconButton>
                        ) : (
                           <IconButton onClick={() => removeSong(allTracks[currentTrackIndex])} href="">
                              <RemoveCircleOutlineIcon/>
                           </IconButton>
                        )}
                     </div>
                  </Authorized>

                  <Unauthorized/>
               </CheckAuth>

               <div className="player-box-change__volume">
                  <IconButton className="player-box__button" onClick={audioToggleVolume} href="">
                     {isVolume ? <VolumeUpIcon/> : <VolumeOffIcon/>}
                  </IconButton>
               </div>
            </div>
         </div>

         <Dialog className="full-player" fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <Button className="full-player__close" fullWidth onClick={handleClose}>
               <KeyboardArrowDownIcon/>
            </Button>
            <div
               className="full-player__img"
               style={{
                  background: `url(${
                     (allTracks && allTracks[currentTrackIndex].albumPicture !== '') ? 
                        `/tracks-data/album-picture/lg/${allTracks[currentTrackIndex].albumPicture}` : 
                        audioImageNotFound
                  })`
               }}
            />
            <div className="player-progress">
               <div className="player-progress__filled" style={progressStyle}/>
               <p className="player-progress__progress-duration">{progressDuration && progressDuration}</p>
               <p className="player-progress__duration">{duration && duration}</p>
            </div>

            <div className="full-player__desc responsive-wrapper">
               <CheckAuth>
                  <Authorized>
                     <div className="flex j-sb">
                        <div className="full-player__desc-auth">
                           <p className="full-player__track-name">
                              {allTracks && allTracks[currentTrackIndex].songName}
                           </p>
                           <div className="full-player__singer">
                              <Link to={`${urls.artists.path}/${allTracks && allTracks[currentTrackIndex].singerId}`} onClick={handleClose}>
                                 {allTracks && allTracks[currentTrackIndex].singer}
                              </Link>
                           </div>
                        </div>

                        <div className="full-player__add">
                           {allTracks && savedTracks.findIndex(item => item.id === allTracks[currentTrackIndex].id) === -1 ? (
                              <IconButton onClick={() => saveSong(allTracks[currentTrackIndex])} href="">
                                 <AddIcon/>
                              </IconButton>
                           ) : (
                              <IconButton onClick={() => removeSong(allTracks[currentTrackIndex])} href="">
                                 <RemoveCircleOutlineIcon/>
                              </IconButton>
                           )}
                        </div>
                     </div>
                  </Authorized>

                  <Unauthorized>
                     <div className="full-player__desc-un-auth">
                        <p className="full-player__track-name">
                           {allTracks && allTracks[currentTrackIndex].songName}
                        </p>
                        <div className="full-player__singer">
                           <Link to={`${urls.artists.path}/${allTracks && allTracks[currentTrackIndex].singerId}`} onClick={handleClose}>
                              {allTracks && allTracks[currentTrackIndex].singer}
                           </Link>
                        </div>
                     </div>
                  </Unauthorized>
               </CheckAuth>
            </div>

            <div className="full-player__action flex j-sb flex-align-center">
               <IconButton size="medium" onClick={prevSong} href="">
                  <FastRewindIcon/>
               </IconButton>
               <IconButton size="medium" onClick={() => {
                  return isPlaying ? stopSong() : playSong(isAuth, 'Авторизуйтесь для прослушивания треков');
               }} href="">
                  {!isPlaying ? <PlayArrowIcon/> : <PauseIcon/>}
               </IconButton>
               <IconButton size="medium" onClick={nextSong} href="">
                  <FastForwardIcon/>
               </IconButton>
            </div>
         </Dialog>
      </div>
   )
};

PlayerTemplate.propTypes = {
   allTracks: propTypes.arrayOf(propTypes.object),
   savedTracks: propTypes.arrayOf(propTypes.object),
   isPlaying: propTypes.bool.isRequired,
   currentTrackIndex: propTypes.number.isRequired,
   isAuth: propTypes.bool.isRequired,

   playSong: propTypes.func.isRequired,
   stopSong: propTypes.func.isRequired,
   nextSong: propTypes.func.isRequired,
   prevSong: propTypes.func.isRequired,
   saveSong: propTypes.func.isRequired,
   removeSong: propTypes.func.isRequired,
   audioToggleVolume: propTypes.func.isRequired,
};

export default connect((state) => ({
   savedTracks: state[savedTracksModule].savedTracks,
   currentTrackIndex: state[playerModule].currentTrackIndex,
   allTracks: state[playerModule].allTracks,
   isPlaying: state[playerModule].isPlaying,
   isAuth: state[authModule].isAuth
}), {
   playSong, stopSong,
   nextSong, prevSong,
   removeSong, saveSong
})(PlayerTemplate);
