import React, {useState, useEffect} from 'react';
import * as propTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useStyles} from './style';

import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import {login, moduleName as authModule} from "../../ducks/Auth";
import {urls} from "../../config/utils";

const SignIn = ({login, loadingOfForm, errorOfForm}) => {
   const [phone, setPhone] = useState('');
   const [password, setPassword] = useState('');
   const [hidden, setHidden] = useState(true);
   const [invalidData, setInvalidNum] = useState(false);

   const classes = useStyles();

   const handleSubmit = (event) => {
      event.preventDefault();

      if (phone.length === 11 && password.length) {
         setInvalidNum(false);
         login({username: phone, password})
      } else {
         setInvalidNum(true);
      }
   };

   const matchPhone = (e) => {
      const reg = /\D*/g;

      if (e.target.value.search(reg) !== -1) {
         e.target.value = e.target.value.replace(reg, '');
      }
   };

   useEffect(() => {
      if (errorOfForm) {
         setPassword('');
      }
   }, [errorOfForm]);

   const RenderMessage = () =>
      (errorOfForm && errorOfForm.code === 'ECONNABORTED') ? <p className={classes.notification}>Время ожидания сервера истекло, повторите попытку</p> :
         (errorOfForm) ? <p className={classes.notification}>Ошибка входа. Проверьте данные и повторите попытку.</p> :
               (invalidData) ? <p className={classes.notification}>Неверный номер. Должно быть 10 цифр</p> : null;

   return (
      <Container component="main" maxWidth="xs" className="auth-page">
         <CssBaseline/>

         <div className={classes.paper}>
            <Avatar className={classes.avatar} component="div">
               <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
               Авторизация
            </Typography>

            <form onSubmit={handleSubmit} className={classes.form}>
               <TextField
                  className="phone-field"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  onInput={matchPhone}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="phone"
                  label="Номер телефона"
                  name="phone"
                  required
                  autoFocus
                  type="tel"
               />
               <div className={classes.passwordBox}>
                  <TextField
                     className="password-field"
                     type={hidden ? 'password' : 'text'}
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                     variant="outlined"
                     margin="normal"
                     name="password"
                     label="Пароль"
                     id="password"
                     required
                     fullWidth
                  />
                  <IconButton className={classes.hiddenPass} onClick={() => setHidden(!hidden)}>
                     {hidden ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                  </IconButton>
               </div>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={loadingOfForm}
                  href=""
               >
                  {loadingOfForm ?
                     <CircularProgress size={21}/> :
                     'Войти'
                  }
               </Button>

               <Grid container justify="space-between" component="div">
                  <Grid item component="div">
                  <Link to={urls.home.path} variant="body2">
                     Главная
                  </Link>
               </Grid>

                  <Grid item component="div">
                     <Link to={urls.signUp.path} variant="body2">
                        Нет аккаунта? Зарегистрироваться
                     </Link>
                  </Grid>
               </Grid>

					<div className={classes.hiddenBox}>
						<p className={classes.hidden}>Введите номер <span className={classes.hiddenUnderline}>87757989824</span></p>
						<p className={classes.hidden}>Пароль <span className={classes.hiddenUnderline}>1234</span></p>
					</div>

               <RenderMessage/>
            </form>
         </div>
      </Container>
   );
};

SignIn.propTypes = {
   login: propTypes.func.isRequired,
};

export default connect((state) => ({
   loadingOfForm: state[authModule].loadingOfForm,
   errorOfForm: state[authModule].errorOfForm,
   userData: state[authModule].userData
}), {
   login
})(SignIn);
