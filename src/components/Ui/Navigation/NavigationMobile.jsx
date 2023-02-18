import React, {Fragment, useState} from 'react';
import * as propTypes from "prop-types";
import {Link, NavLink} from "react-router-dom";

import AppBar from "@material-ui/core/AppBar/AppBar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger/useScrollTrigger";
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Slide from "@material-ui/core/Slide";

import NavigationMobileDialogOfSearch from "./NavigationMobileDialogOfSearch";
import NavigationDialogOfLogout from "./NavigationDialogOfLogout";

import CheckAuth, {Authorized, Unauthorized} from "../CheckAuth";
import {urls} from "../../../config/utils";
import {useStyles} from "./style";

function HideOnScroll(props) {
   const {children, window} = props;
   const trigger = useScrollTrigger({target: window ? window() : undefined});

   return (
      <Slide appear={false} direction="down" in={!trigger}>
         {children}
      </Slide>
   );
}

const NavigationMobile = (props) => {
   const [logoutOpen, setLogoutModal] = useState(false);
   const [open, setOpen] = useState(false);
   const classes = useStyles();

   const handleClickOpenLogout = () => setLogoutModal(true);
   const handleCloseLogout = () => setLogoutModal(false);
   const handleClickOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   return (
      <Fragment>
         <CssBaseline/>

         <HideOnScroll {...props}>
            <AppBar className="mobile-header responsive-wrapper">
               <div className="flex j-sb flex-align-center">
                  <Typography variant="body1" className="mobile-header__logo">
                     <Link to={urls.home.path}>Music Player</Link>
                  </Typography>

                  <div className="mobile-header__search flex">
                     <CheckAuth>
                        <Authorized>
                           <IconButton className={classes.profileButton} href="">
                              <NavLink activeClassName="active-navigation-item" to={urls.savedTracks.path}>
                                 <AccountCircleIcon/>
                              </NavLink>
                           </IconButton>
                           <IconButton onClick={handleClickOpenLogout} className={classes.profileButton} href="">
                              <ExitToAppIcon/>
                           </IconButton>
                        </Authorized>

                        <Unauthorized>
                           <Button href="">
                              <Link to={urls.login.path}>Войти</Link>
                           </Button>
                        </Unauthorized>
                     </CheckAuth>

                     <IconButton onClick={handleClickOpen} href="">
                        <SearchIcon/>
                     </IconButton>

                     <NavigationMobileDialogOfSearch
                        open={open}
                        handleClose={handleClose}
                     />

                     <NavigationDialogOfLogout
                        open={logoutOpen}
                        handleClose={handleCloseLogout}
                     />
                  </div>
               </div>
            </AppBar>
         </HideOnScroll>
         <Toolbar className="mobile-header-divider"/>
      </Fragment>
   );
};

HideOnScroll.propTypes = {
   children: propTypes.element.isRequired,
   window: propTypes.func,
};

export default NavigationMobile;
