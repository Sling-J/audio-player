import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
   paper: {
      paddingTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#ef5466',
   },
   form: {
      width: '100%',
      marginTop: '15px',
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
   notification: {
      marginTop: '10px',
      fontSize: '15px',
      color: 'tomato',
      textAlign: 'center'
   },
   passwordBox: {
      position: 'relative'
   },
   hiddenPass: {
      position: 'absolute',
      top: '27%',
      right: '5px',
	},
	hidden: {
      fontSize: '13px',
	},
	hiddenUnderline: {
		textDecoration: 'underline'
	},
	hiddenBox: {
		marginTop: '12px'
	}
}));
