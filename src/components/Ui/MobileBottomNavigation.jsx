import React from 'react';
import {NavLink} from 'react-router-dom';

// Components
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {homeNavItems} from "../../config/routerConfig";

export default function MobileBottomNavigation({classes}) {
   const matches = useMediaQuery('(max-width: 572px)');
   const navItems = homeNavItems.slice(0, 4);

   return !classes && matches && (
      <div className="bottom-navigation flex j-sb flex-align-bottom">
         {navItems.map((item, i) => (
            <div className="bottom-navigation-items navItems" key={i}>
               <NavLink
                  className="bottom-navigation-buttons"
                  activeClassName="active-navigation-item"
                  to={item.path}
               >
                  <Button href="">
                     <p>{item.icon}</p>
                     <p>{item.tabName}</p>
                  </Button>
               </NavLink>
            </div>
         ))}
      </div>
   );
}
