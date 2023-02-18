import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from "react-router-dom";

import Auth from "./Auth/Auth";

import HomePage from "./Home/Home";
import ItemTracksPage from "./ItemTracks/ItemTracks";
import SingersPage from "./Singers/Singers";
import SingersDetailPage from "./Singers/SingersDetail";
import GenresPage from "./Genres/Genres";
import GenresDetailPage from "./Genres/GenresDetail";

import {Spacing, Wrapper} from "./style";
import MobileBottomNavigation from "./Ui/MobileBottomNavigation";
import PrivateRouter from "./Ui/PrivateRouter/PrivateRouter";
import Navigation from "./Ui/Navigation/Navigation";
import Notifications from "./Notifications/Notifications";
import Player from "./Ui/Player/Player";

import {checkAuth} from "../ducks/Auth";
import {urls} from "../config/utils";

const Root = (props) => {
   const [classes, setClasses] = useState(null);

   useEffect(() => {
		props.checkAuth();
   }, [props]);

   useEffect(() => {
     ((props.history.location.pathname === '/user/login') || (props.history.location.pathname === '/user/sign-up')) &&
      setClasses('main-is-visible');

      props.history.listen(location => {
         (location.pathname === '/user/login') || (location.pathname === '/user/sign-up') ?
            setClasses('main-is-visible') :
            setClasses(null);
      })
   }, [props.history]);

   return (
      <Fragment>
         <Wrapper>
            <Navigation classes={classes}/>
            <Notifications/>
            <Switch>
               <Route path={urls.user.path} component={Auth}/>
               <Route path={urls.home.path} component={HomePage}/>
               <Route path={urls.allTracks.path}
                      render={() => <ItemTracksPage item={urls.allTracks}/>}/>
               <Route path={urls.newTracks.path}
                      render={() => <ItemTracksPage item={urls.newTracks}/>}/>
               <Route path={urls.bestTracks.path}
                      render={() => <ItemTracksPage item={urls.bestTracks}/>}/>
               <Route path={urls.popularTracks.path}
                      render={() => <ItemTracksPage item={urls.popularTracks}/>}/>
               <Route exact path={urls.artists.path} component={SingersPage}/>
               <Route exact path={urls.genres.path} component={GenresPage}/>
               <Route path={urls.genresDetail.path}
                      render={({match}) => <GenresDetailPage slug={match.params.slug}/>}/>
               <Route path={urls.artistsDetail.path}
                      render={({match}) => <SingersDetailPage id={match.params.id - 1}/>}/>
               <PrivateRouter path={urls.savedTracks.path}
                              component={() => <ItemTracksPage item={urls.savedTracks}/>}
                              authorized/>
               <Route render={() => <Redirect to={urls.home.path}/>}/>
            </Switch>
         </Wrapper>

         <Spacing className={classes}/>
         <Player classes={classes}/>
         <MobileBottomNavigation classes={classes}/>
      </Fragment>
   );
};

export default connect(null, {
   checkAuth
})(Root);
