import React from 'react';
import * as propTypes from 'prop-types';
import {connect} from 'react-redux';

import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import {logout} from "../../../ducks/Auth";
import {useStyles} from "./style";

const NavigationDialogOfLogout = ({handleClose, open, logout}) => {
   const classes = useStyles();

   return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
         <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}>Выход?</DialogTitle>

         <div className="flex j-sb" onClick={handleClose}>
            <Button className={classes.logoutButton} onClick={logout} href="">Да</Button>
            <Button className={classes.logoutButton} href="">Нет</Button>
         </div>
      </Dialog>
   );
};

NavigationDialogOfLogout.propTypes = {
   handleClose: propTypes.func.isRequired,
   logout: propTypes.func.isRequired,
   open: propTypes.bool.isRequired,
};

export default connect(null, {
   logout
})(NavigationDialogOfLogout);
