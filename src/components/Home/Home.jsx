import React, {Fragment} from 'react';
import * as propTypes from "prop-types";
import {connect} from 'react-redux';

import Header from "../Ui/Header/Header";
import HomeBox from "./HomeBox";
import HomeTracksBox from "./HomeTracksBox";

import {moduleName as playerModule} from "../../ducks/Player";

const Home = ({allTracks, currentTrackIndex}) => {
   return (
      <Fragment>
         <Header isObj={allTracks && allTracks[currentTrackIndex]}/>

         <section className="home">
            <HomeBox/>
            <HomeTracksBox/>
         </section>
      </Fragment>
   )
};

Home.propTypes = {
   allTracks: propTypes.arrayOf(propTypes.object),
   currentTrackIndex: propTypes.number.isRequired,
};

export default connect((state) => ({
   allTracks: state[playerModule].allTracks,
   currentTrackIndex: state[playerModule].currentTrackIndex,
}))(Home);
