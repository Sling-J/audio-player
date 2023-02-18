import React, {Fragment} from 'react';
import * as propTypes from "prop-types";
import {connect} from 'react-redux';

import Header from "../Ui/Header/Header";
import DimmerCards from "../Ui/Dimmer/DimmerCards";

import {moduleName as playerModule} from "../../ducks/Player";
import {moduleName as genresModule} from "../../ducks/Genres";

import {urls} from "../../config/utils";

const Genres = ({genres, loadingOfGenres, allTracks, currentTrackIndex}) => {
   const customClass = {
      item: "genre-items flex-items",
      link: "home-box-line__link",
      box: "home-box-line__card uk-card uk-card-default",
      imgBox: "home-box-line__img home-box-line-genre__img uk-card-media-top",
      body: "home-box-line__body",
      title: "uk-card-title"
   };

   return (
      <Fragment>
         <Header isObj={allTracks && allTracks[currentTrackIndex]}/>
         <section className="home genres">
            <div className="home-box genres-box">
               <ul className="uk-child-width-1-6 uk-grid">
                  <DimmerCards
                     customClass={customClass}
                     customArr={genres}
                     url={`${urls.genres.path}/`}
                     imgUrl="/tracks-data/genres-picture"
                     loading={loadingOfGenres}
                  />
               </ul>
            </div>
         </section>
      </Fragment>
   )
};

Genres.propTypes = {
   genres: propTypes.arrayOf(propTypes.object),
   allTracks: propTypes.arrayOf(propTypes.object),
   currentTrackIndex: propTypes.number.isRequired,
   loadingOfGenres: propTypes.bool.isRequired,
   errorOfGenres: propTypes.object,
};

export default connect((state) => ({
   allTracks: state[playerModule].allTracks,
   currentTrackIndex: state[playerModule].currentTrackIndex,
   genres: state[genresModule].genres,
   loadingOfGenres: state[genresModule].loadingOfGenres,
   errorOfGenres: state[genresModule].errorOfGenres
}))(Genres);
