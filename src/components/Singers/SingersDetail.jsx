import React, {Fragment} from 'react';
import * as propTypes from 'prop-types';
import {connect} from 'react-redux';

import Header from "../Ui/Header/Header";
import Tracks from "../Ui/Tracks/Tracks";

import {moduleName as singersModule} from "../../ducks/Singers";
import {urls} from "../../config/utils";

const SingersDetail = ({singers, id, loadingOfSingers}) => (
   <Fragment>
      <Header isObj={singers.length !== 0 ? singers[id] : ''} isArtist/>
      <Tracks
         tracks={singers.length !== 0 ? singers[id].tracks : []}
         loading={loadingOfSingers}
         paginationVisible
         title={singers.length !== 0 && singers[id].name}
         to={urls.artistsDetail.path}
      />
   </Fragment>
);

SingersDetail.propTypes = {
   singers: propTypes.arrayOf(propTypes.object),
   loadingOfSingers: propTypes.bool.isRequired,
   id: propTypes.number
};

export default connect((state) => ({
   singers: state[singersModule].singers,
   loadingOfSingers: state[singersModule].loadingOfSingers
}))(SingersDetail);
