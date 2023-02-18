import React from 'react';
import * as propTypes from "prop-types";
import {connect} from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import {saveSong, removeSong, moduleName as savedTracksModule} from "../../../ducks/SavedTracks";

const ActionButton = ({track, savedTracks, saveSong, removeSong, className, size}) => {
   return savedTracks.findIndex(item => item.id === track.id) === -1 ? (
      <Tooltip title="Save song" placement="top" enterDelay={300}>
         <IconButton
            className={className}
            size={size}
            onClick={() => saveSong(track)}
            href=""
         >
            <AddIcon/>
         </IconButton>
      </Tooltip>
   ) : (
      <Tooltip title="Remove song" placement="top-start" enterDelay={300}>
         <IconButton
            className={className}
            size={size}
            onClick={() => removeSong(track)}
            href=""
         >
            <RemoveCircleOutlineIcon/>
         </IconButton>
      </Tooltip>
   )
};

ActionButton.propTypes = {
   savedTracks: propTypes.arrayOf(propTypes.object),
   track: propTypes.object,

   saveSong: propTypes.func.isRequired,
   removeSong: propTypes.func.isRequired,
};

export default connect((state) => ({
   savedTracks: state[savedTracksModule].savedTracks,
}), {
   saveSong,
   removeSong,
})(ActionButton);
