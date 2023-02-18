import React from 'react';
import * as propTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import CustomButton from "../CustomButton";

import {playSong, stopSong, moduleName as playerModule} from "../../../ducks/Player";
import {moduleName as authModule} from "../../../ducks/Auth";
import {urls} from "../../../config/utils";

const HeaderWithObject = ({isObj, isArtist, isPlaying, stopSong, playSong, isAuth}) => {
   return (
      isObj && typeof isObj === 'object' ? (
         <div>
            {isArtist && <p>ИСПОЛНИТЕЛЬ</p>}
            <h1 className="main-title">{isObj.songName || isObj.name}</h1>

            <div className="header-box-desc__singer">
               {isObj.singer ? (
                  <p>
                     <span className="main-desc">Исполнители: </span>
                     <Link to={`${urls.artists.path}/${isObj.singerId}`}>{isObj.singer}</Link>
                  </p>
               ) : (
                  <p><span className="main-desc">Треков: </span>{isObj.tracks.length}</p>
               )}
            </div>

            <div className="header-box-desc__singer">
               {isObj.description && (
                  <p><span className="main-desc">Описание: </span> {isObj.description}</p>
               )}
            </div>

            <div className="header-box-desc__genre">
               {isObj.year && isObj.genre && (
                  <p>
                     <span className="main-desc">{isObj.year}</span>
                     <span className="header-box-desc-genre__divider">&#8226;</span>
                     <span className="main-desc">{isObj.genre}</span>
                  </p>
               )}
            </div>

            <div className="header-box-desc__play flex flex-align-center">
               <div className="header-box-desc-play__button">
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

               <div className="header-box-desc-play__button">
                  {/*<CustomButton>*/}
                  {/*   <span className="main-btn__icon">*/}
                  {/*      <svg className="svg-icon svg-icon-play-circle" focusable="false" height="14" width="14"*/}
                  {/*           viewBox="0 0 12 12" aria-hidden="true">*/}
                  {/*         <path*/}
                  {/*            d="M6 11A5 5 0 1 0 6 1a5 5 0 0 0 0 10zm0 1A6 6 0 1 1 6 0a6 6 0 0 1 0 12zM4.937 4.017a.125.125 0 0 0-.187.108v3.75c0 .096.104.156.187.108l3.25-1.875a.125.125 0 0 0 0-.216l-3.25-1.875z"/>*/}
                  {/*      </svg>*/}
                  {/*   </span>*/}
                  {/*   <span className="main-btn__text">Перемешать</span>*/}
                  {/*</CustomButton>*/}
               </div>
            </div>
         </div>
      ) : null
   );
};

HeaderWithObject.propTypes = {
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
})(HeaderWithObject);
