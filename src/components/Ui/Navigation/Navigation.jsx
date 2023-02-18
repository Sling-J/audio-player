import React from 'react';

import NavigationMobile from "./NavigationMobile";
import NavigationDesktop from "./NavigationDesktop";

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Navigation = ({classes}) => {
   const matches = useMediaQuery('(max-width: 572px)');

   if (classes) {
      return null;
   } else {
      return matches ?
         <NavigationMobile/> :
         <NavigationDesktop/>
   }
};

export default Navigation
