import React from 'react';
import * as propTypes from "prop-types";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {moduleName as genresModule} from "../../ducks/Genres";
import {moduleName as singersModule} from "../../ducks/Singers";

const HomeCarousel = ({title, children, childWidth, to}) => (
   <div className="home-box__line">
      <h2 className="home-box-line__title section-title responsive-wrapper">
         <Link to={to}>
            {title}

            <ChevronRightIcon/>
         </Link>
      </h2>

      <div uk-slider="finite: false">
         <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1">
            <ul className={`uk-slider-items uk-grid ${childWidth && `uk-child-width-${childWidth}`}`}>
               {children}
            </ul>

            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
               className="uk-position-center-left uk-position-small uk-hidden-hover"
               uk-slidenav-previous=""
               uk-slider-item="previous"
            >
            </a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
               className="uk-position-center-right uk-position-small uk-hidden-hover"
               uk-slidenav-next=""
               uk-slider-item="next"
            >
            </a>
         </div>

         <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin"/>
      </div>
   </div>
);

HomeCarousel.propTypes = {
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
}))(HomeCarousel);
