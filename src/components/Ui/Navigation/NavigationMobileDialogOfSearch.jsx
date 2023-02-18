import React, {forwardRef} from 'react';
import * as propTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar/AppBar";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

import {useStyles} from "./style";

const Transition = forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
});

const NavigationMobileDialogOfSearch = ({handleClose, open}) => {
   const classes = useStyles();

   return (
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
         <AppBar className={classes.appBar}>
            <Toolbar>
               <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close" href="">
                  <CloseIcon/>
               </IconButton>
               <Typography variant="body1" className={classes.title}>
                  Трэки
               </Typography>
               <Button color="inherit" onClick={handleClose} href="">
                  Поиск
               </Button>
            </Toolbar>
         </AppBar>
      </Dialog>
   );
};

NavigationMobileDialogOfSearch.propTypes = {
   handleClose: propTypes.func.isRequired,
   open: propTypes.bool.isRequired,
};

export default NavigationMobileDialogOfSearch;
