import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
   appBar: {
      position: 'relative',
      backgroundColor: '#007EEB'
   },
   title: {
      marginLeft: theme.spacing(1),
      color: '#fff',
      flex: 1
   },
   profileButton: {
      order: 1
   },
   logoutButton: {
      padding: '8px 35px',
      fontSize: '14px'
   },
   dialogTitle: {
      textAlign: 'center',
   },
   mainLogout: {

   }
}));