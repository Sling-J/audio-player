import React from 'react';
import * as propTypes from "prop-types";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";

import {moduleName as playerModule} from "../../../ducks/Player";
import {audioImageNotFound} from '../../../assets/img';
import {homeNavItems, profileNavItems} from "../../../config/routerConfig";

import HeaderWithObject from "./HeaderWithObject";
import HeaderWithoutObject from "./HeaderWithoutObject";

const Header = ({page, isObj, isArtist}) => {
   const matches = useMediaQuery('(max-width: 572px)');
   let bgUrl;

   if (isObj && typeof isObj === 'object') {
      bgUrl =
         (isObj.albumPicture) ? `/tracks-data/album-picture/lg/${isObj.albumPicture}` :
         (isArtist && isObj.picture) ? `/tracks-data/group-picture/${isObj.picture}` :
         (isObj.picture) ? `/tracks-data/genres-picture/${isObj.picture}` :
         audioImageNotFound
   } else {
      bgUrl = audioImageNotFound;
   }

   const navItems = page === 'profile' ? profileNavItems : homeNavItems;

   return !matches && (
      <header>
         <div className="header-box flex ">
            <div className="header-box__img" style={{background: `url('${bgUrl}')`}}/>

            <div className="header-box__desc">
               {page === 'profile' && <p className="main-desc">МОЯ МУЗЫКА</p>}

               <HeaderWithObject isObj={isObj}/>
               <HeaderWithoutObject isObj={isObj}/>
            </div>
         </div>

         <ul className="header-tab flex flex-align-center flex-wrap">
            {navItems.map((item, i) => (
               <li key={i}>
                  <NavLink to={item.path} activeClassName="header-tab__active">{item.tabName}</NavLink>
               </li>
            ))}
         </ul>

         <Divider style={{marginTop: '8px'}} component="div"/>
      </header>
   );
};

Header.propTypes = {
   isPlaying: propTypes.bool.isRequired,
   page: propTypes.string,
   isObj: propTypes.oneOfType([
      propTypes.string,
      propTypes.object,
   ]),
};

export default connect((state) => ({
   isPlaying: state[playerModule].isPlaying,
}))(Header);
