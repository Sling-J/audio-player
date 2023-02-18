import React, {Fragment} from 'react';
import * as propTypes from 'prop-types';
import {connect} from 'react-redux';

import Header from "../Ui/Header/Header";
import Tracks from "../Ui/Tracks/Tracks";

import {moduleName as genresModule} from "../../ducks/Genres";
import {urls} from "../../config/utils";

const GenresDetail = ({slug, genres, loadingOfGenres}) => {
   const currentGenre = genres.length !== 0 && genres.find(genre => slug === genre.slug);

   return (
      <Fragment>
         <Header isObj={genres.length !== 0 ? currentGenre : ''}/>
         <Tracks
            tracks={genres.length !== 0 ? currentGenre.tracks : []}
            loading={loadingOfGenres}
            paginationVisible
            title={genres.length !== 0 && currentGenre.name}
            to={urls.genresDetail.path}
         />
      </Fragment>
   )
};

GenresDetail.propTypes = {
   genres: propTypes.arrayOf(propTypes.object),
   loadingOfGenres: propTypes.bool.isRequired,
   slug: propTypes.string,
};

export default connect((state) => ({
   genres: state[genresModule].genres,
   loadingOfGenres: state[genresModule].loadingOfGenres
}))(GenresDetail);
