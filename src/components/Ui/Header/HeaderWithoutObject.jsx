import React from 'react';
import * as propTypes from 'prop-types';
import {connect} from 'react-redux';

import {playSong, stopSong, moduleName as playerModule} from "../../../ducks/Player";
import {moduleName as authModule} from "../../../ducks/Auth";

import CustomButton from "../CustomButton";

const HeaderWithoutObject = ({isObj, isPlaying, stopSong, playSong, isAuth}) => typeof isObj === 'string' && (
   <div>
      <h1 className="main-title">{isObj}</h1>

      <div className="header-box-desc__play">
         <CustomButton isDark onClick={() => {
            return isPlaying ? stopSong() : playSong(isAuth, 'Авторизуйтесь для прослушивания треков')
         }}>
            <span className="main-btn__icon">
               <svg className="svg-icon svg-icon-play-circle" focusable="false" height="14" width="14" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M6 11A5 5 0 1 0 6 1a5 5 0 0 0 0 10zm0 1A6 6 0 1 1 6 0a6 6 0 0 1 0 12zM4.937 4.017a.125.125 0 0 0-.187.108v3.75c0 .096.104.156.187.108l3.25-1.875a.125.125 0 0 0 0-.216l-3.25-1.875z"/>
               </svg>
            </span>
            <span className="main-btn__text">
               {isPlaying ? 'Пауза' : 'Слушать'}
            </span>
         </CustomButton>
      </div>
   </div>
);

HeaderWithoutObject.propTypes = {
   isAuth: propTypes.bool.isRequired,
   isPlaying: propTypes.bool.isRequired,

   stopSong: propTypes.func.isRequired,
   playSong: propTypes.func.isRequired
};

export default connect((state) => ({
   isPlaying: state[playerModule].isPlaying,
   isAuth: state[authModule].isAuth
}), {
   stopSong, playSong
})(HeaderWithoutObject);
