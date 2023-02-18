import React from 'react';
import * as propTypes from "prop-types";
import {connect} from 'react-redux';

import HomeCarousel from "./HomeCarousel";
import DimmerCards from "../Ui/Dimmer/DimmerCards";

import {moduleName as genresModule} from "../../ducks/Genres";
import {moduleName as singersModule} from "../../ducks/Singers";
import {urls} from "../../config/utils";

const HomeBox = ({genres, singers, loadingOfGenres, loadingOfSingers}) => {
   const customClassGenre = {
      item: "genre-items",
      link: "home-box-line__link",
      box: "home-box-line__card uk-card uk-card-default",
      imgBox: "home-box-line__img home-box-line-genre__img uk-card-media-top",
      body: "home-box-line__body",
      title: "uk-card-title"
   };

   const customClassArtist = {
      item: "artist-items",
      link: "home-box-line__link",
      box: "home-box-line__card uk-card uk-card-default",
      imgBox: "home-box-line__img home-box-line-singer__img uk-card-media-top",
      body: "home-box-line__body",
      title: "uk-card-title"
   };

   const slicedGenres = genres.slice(0, 9);
   const slicedSingers = singers.slice(0, 9);

   return (
      <div className="home-box">
         <HomeCarousel childWidth="1-6" title={urls.genres.name} to={urls.genres.path}>
            <DimmerCards
               customClass={customClassGenre}
               customArr={slicedGenres}
               url={`${urls.genres.path}/`}
               imgUrl="/tracks-data/genres-picture"
               loading={loadingOfGenres}
            />
         </HomeCarousel>

         <HomeCarousel title={urls.artists.name} to={urls.artists.path}>
            <DimmerCards
               customClass={customClassArtist}
               customArr={slicedSingers}
               url={`${urls.artists.path}/`}
               imgUrl="/tracks-data/group-picture"
               loading={loadingOfSingers}
               isArtist
            />
         </HomeCarousel>
      </div>
   )
};

HomeBox.propTypes = {
   genres: propTypes.arrayOf(propTypes.object),
   singers: propTypes.arrayOf(propTypes.object),
   loadingOfGenres: propTypes.bool.isRequired,
   loadingOfSingers: propTypes.bool.isRequired,
};

export default connect((state) => ({
   genres: state[genresModule].genres,
   singers: state[singersModule].singers,
   loadingOfGenres: state[genresModule].loadingOfGenres,
   loadingOfSingers: state[singersModule].loadingOfSingers,
}))(HomeBox);
