import React, {Fragment} from 'react';
import * as propTypes from "prop-types";
import {connect} from 'react-redux';

import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";

import Header from "../Ui/Header/Header";
import DimmerCards from "../Ui/Dimmer/DimmerCards";

import {moduleName as playerModule} from "../../ducks/Player";
import {moduleName as singersModule} from "../../ducks/Singers";
import {urls} from "../../config/utils";

const Singers = ({allTracks, currentTrackIndex, loadingOfSingers, singers}) => {
   const matches = useMediaQuery('(max-width: 572px)');
   const customClass = {
      item: "artist-items flex-items",
      link: "home-box-line__link",
      box: "home-box-line__card uk-card uk-card-default",
      imgBox: "home-box-line__img home-box-line-singer__img uk-card-media-top",
      body: "home-box-line__body",
      title: "uk-card-title"
   };

   return (
      <Fragment>
         <Header isObj={allTracks && allTracks[currentTrackIndex]}/>
         <section className="home genres">
            <div className="home-box genres-box">
               <ul className={`${!matches ? 'uk-grid' : 'flex j-sb flex-wrap'}`}>
                  <DimmerCards
                     customClass={customClass}
                     customArr={singers}
                     url={`${urls.artists.path}/`}
                     imgUrl="/tracks-data/group-picture"
                     loading={loadingOfSingers}
                     isArtist
                  />
               </ul>
            </div>
         </section>
      </Fragment>
   )
};

Singers.propTypes = {
   allTracks: propTypes.arrayOf(propTypes.object),
   singers: propTypes.arrayOf(propTypes.object),
   loadingOfSingers: propTypes.bool.isRequired,
   currentTrackIndex: propTypes.number.isRequired,
};

export default connect((state) => ({
   allTracks: state[playerModule].allTracks,
   currentTrackIndex: state[playerModule].currentTrackIndex,
   loadingOfSingers: state[singersModule].loadingOfSingers,
   singers: state[singersModule].singers
}))(Singers);
