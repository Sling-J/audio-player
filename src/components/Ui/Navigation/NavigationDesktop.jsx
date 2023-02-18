import React, {useState} from 'react';
import {Link} from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Divider from "@material-ui/core/Divider";

import NavigationDialogOfLogout from './NavigationDialogOfLogout';
import CheckAuth, {Authorized, Unauthorized} from "../CheckAuth";
import CustomButton from "../CustomButton";
import {urls} from "../../../config/utils";

const NavigationDesktop = () => {
	const [logoutOpen, setLogoutModal] = useState(false);

	const handleClickOpenLogout = () => setLogoutModal(true);
	const handleCloseLogout = () => setLogoutModal(false);

   return (
      <nav>
         <div className="nav-container flex flex-align-center">
            <div className="search-panel">
               <TextField
                  className="search-panel__field"
                  label="Поиск..."
                  type="search"
                  variant="outlined"
                  margin="dense"
               />
            </div>

            <div className="menu-container flex j-sb flex-align-center">
               <ul className="menu flex j-sb flex-align-center">
                  <li>
                     <Link to={urls.home.path}>Главная</Link>
                  </li>

                  <CheckAuth>
                     <Authorized>
                        <li>
                           <Link to={urls.savedTracks.path}>Моя музыка</Link>
                        </li>
                     </Authorized>

                     <Unauthorized/>
                  </CheckAuth>
               </ul>

               <div className="sign-in">
                  <CheckAuth>
                     <Authorized>
                        <CustomButton onClick={handleClickOpenLogout}>Выход</CustomButton>
                     </Authorized>

                     <Unauthorized>
                        <CustomButton isLink>
                           <Link to={urls.login.path}>Войти</Link>
                        </CustomButton>
                     </Unauthorized>
                  </CheckAuth>
               </div>
            </div>
         </div>
			
			<NavigationDialogOfLogout open={logoutOpen} handleClose={handleCloseLogout}/>
         <Divider style={{marginTop: '8px'}} component="div"/>
      </nav>
   );
};

export default NavigationDesktop;
