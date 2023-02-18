import React, {Component} from 'react';
import * as propTypes from 'prop-types';
import {connect} from 'react-redux';

import clsx from 'clsx';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {makeStyles} from '@material-ui/core/styles';

import {moduleName as playerModule, clearError} from "../../ducks/Player";

const useStyles1 = makeStyles(theme => ({
   info: {
      backgroundColor: theme.palette.primary.main,
   },
   icon: {
      fontSize: 20,
   },
   iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
   },
   message: {
      display: 'flex',
      alignItems: 'center',
   },
}));

function MySnackbarContentWrapper(props) {
   const classes = useStyles1();
   const {className, message, onClose, variant, ...other} = props;

   return (
      <SnackbarContent
         className={clsx(classes[variant], className)}
         aria-describedby="client-snackbar"
         message={
            <span id="client-snackbar" className={classes.message}>
               <InfoIcon className={clsx(classes.icon, classes.iconVariant)}/>
               {message}
           </span>
         }
         action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
               <CloseIcon className={classes.icon}/>
            </IconButton>,
         ]}
         {...other}
      />
   );
}

MySnackbarContentWrapper.propTypes = {
   className: propTypes.string,
   message: propTypes.string,
   onClose: propTypes.func,
   variant: propTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

class Notifications extends Component{
   state = {
      open: false,
      message: null
   };

   componentDidUpdate(prevProps, prevState, snapshot) {
      const {errorOfPlayer, clearError} = this.props;

      if (prevProps.errorOfPlayer !== errorOfPlayer && errorOfPlayer) {
         this.setState({open: true, message: errorOfPlayer});
         clearError();
      }
   }

   handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }

      this.props.clearError();
      this.setState({open: false})
   };

   render() {
      const {message, open} = this.state;

      return (
         <Snackbar
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'center',
            }}
            open={open}
            autoHideDuration={3500}
            onClose={() => {
               this.handleClose()
            }}
         >
            <MySnackbarContentWrapper
               onClose={() => {
                  this.handleClose()
               }}
               variant="info"
               message={message}
            />
         </Snackbar>
      );
   }
}

export default connect((state) => ({
   errorOfPlayer: state[playerModule].errorOfPlayer
}), {
   clearError
})(Notifications)
