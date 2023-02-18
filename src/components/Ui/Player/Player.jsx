import React, {Component} from 'react';
import * as propTypes from "prop-types";
import {connect} from 'react-redux';

import {moduleName as authModule} from "../../../ducks/Auth";
import {playSong, nextSong, fetchTracks, playSongFail, moduleName as playerModule} from "../../../ducks/Player";
import {fetchPopularTracks} from "../../../ducks/PopularTracks";
import {fetchBestTracks} from "../../../ducks/BestTracks";
import {fetchNewTracks} from "../../../ducks/NewTracks";
import {fetchSingers} from "../../../ducks/Singers";
import {fetchGenres} from "../../../ducks/Genres";

import PlayerTemplate from "./PlayerTemplate";

class Player extends Component {
   audio = new Audio();

   state = {
      isVolume: true,
      progressStyle: null,
      duration: null,
      progressDuration: '0:00',
      currentVolume: 1
   };

   componentDidMount() {
      const {
         fetchTracks, fetchBestTracks, fetchNewTracks,
         fetchPopularTracks, fetchGenres, fetchSingers
      } = this.props;

      const {audio} = this;

      fetchTracks();
      fetchBestTracks();
      fetchNewTracks();
      fetchPopularTracks();
      fetchGenres();
      fetchSingers();

      audio.preload = "metadata";

      audio.addEventListener('timeupdate', this.audioProgress);
      audio.addEventListener('ended', this.audioEnding);
      audio.addEventListener('loadedmetadata', () => this.setState({
         duration: Player.formatTime(audio.duration.toFixed())
      }));
   }

   componentDidUpdate(prevProps, prevState) {
      const {allTracks, currentTrackIndex, isPlaying, playSongFail} = this.props;

      if (prevProps.allTracks !== allTracks) {
         this.audio.src = `/tracks-data/track-list/${allTracks[currentTrackIndex].url}`;
      }

      if (prevProps.currentTrackIndex !== currentTrackIndex) {
         this.audioChange();
      }

      if (!isPlaying) {
         this.audio.pause();
      } else {
         this.audio.play()
            .then().catch(() => playSongFail('Не удалось воспроизвести трек'));
      }
   }

   static formatTime(time) {
      const audioDur = time;
      const min = ~~((audioDur % 3600) / 60);
      const sec = (audioDur % 60).toString();

      return `${min}:${sec.length === 1 ? '0' + sec : sec}`;
   }

   audioToggleVolume = () => {
      const {isVolume, currentVolume} = this.state;

      isVolume ? this.audio.volume = 0 : this.audio.volume = currentVolume;
      this.setState(({isVolume}) => ({isVolume: !isVolume}))
   };

   audioProgress = () => {
      const {audio} = this;

      this.setState({
         progressStyle: {
            width: `${audio.currentTime / audio.duration * 100}%`
         }
      });

      this.setState({
         progressDuration: Player.formatTime(audio.currentTime.toFixed())
      })
   };

   audioEnding = () => {
      const {audio, props} = this;

      if (props.isAuth) {
         props.nextSong();
         audio.play()
            .then().catch(() => props.playSongFail('Не удалось воспроизвести трек'));
      } else {
         props.playSongFail('Авторизуйтесь для прослушивания треков');
      }
   };

   audioChange = () => {
      const {allTracks, currentTrackIndex, isPlaying, isAuth, playSongFail} = this.props;

      this.audio.src = `/tracks-data/track-list/${allTracks[currentTrackIndex].url}`;
      this.setState({progressStyle: null});

      if (isAuth) {
         if (isPlaying) {
            playSong(isAuth, 'Авторизуйтесь для прослушивания треков');
            this.audio.play()
               .then().catch(() => playSongFail('Не удалось воспроизвести трек'));
         }
      } else {
         playSongFail('Авторизуйтесь для прослушивания треков');
      }
   };

   render() {
      const {isVolume, progressStyle, progressDuration, duration} = this.state;
      const {classes} = this.props;

      return <PlayerTemplate
         isVolume={isVolume}
         progressStyle={progressStyle}
         progressDuration={progressDuration}
         audioToggleVolume={this.audioToggleVolume}
         duration={duration}
         classes={classes}
      />
   }
}

Player.propTypes = {
   allTracks: propTypes.arrayOf(propTypes.object),
   savedTracks: propTypes.arrayOf(propTypes.object),
   isPlaying: propTypes.bool.isRequired,
   isAuth: propTypes.bool.isRequired,
   currentTrackIndex: propTypes.number.isRequired,

   playSong: propTypes.func.isRequired,
   nextSong: propTypes.func.isRequired,
   fetchTracks: propTypes.func.isRequired,
   fetchBestTracks: propTypes.func.isRequired,
   fetchNewTracks: propTypes.func.isRequired,
   fetchPopularTracks: propTypes.func.isRequired,
   fetchGenres: propTypes.func.isRequired,
   fetchSingers: propTypes.func.isRequired,
};

export default connect((state) => ({
   currentTrackIndex: state[playerModule].currentTrackIndex,
   allTracks: state[playerModule].allTracks,
   isPlaying: state[playerModule].isPlaying,
   isAuth: state[authModule].isAuth
}), {
   playSong, nextSong, fetchTracks, fetchGenres,
   fetchBestTracks, fetchNewTracks, fetchPopularTracks,
   fetchSingers, playSongFail
})(Player);
