import React from 'react';
import {Link} from 'react-router-dom';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useStyles} from './style';

import {urls} from "../../config/utils";

const SignUp = () => {
   const classes = useStyles();

   return (
      <Container component="main" maxWidth="xs" className="auth-page">
         <CssBaseline/>

         <div className={classes.paper}>
            <Avatar className={classes.avatar} component="div">
               <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
               Регистрация
            </Typography>

            <form className={classes.form}>
               <Grid container spacing={2} component="div">
                  <Grid item xs={12} sm={6} component="div">
                     <TextField
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="Имя"
                        autoFocus
                     />
                  </Grid>
                  <Grid item xs={12} sm={6} component="div">
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Фамилия"
                        name="lastName"
                     />
                  </Grid>
                  <Grid item xs={12} component="div">
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Электронная почта"
                        name="email"
                        autoComplete="email"
                     />
                  </Grid>
                  <Grid item xs={12} component="div">
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                     />
                  </Grid>
               </Grid>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  href=""
               >
                  Зарегистрироваться
               </Button>

               <Grid container justify="space-between" component="div">
                  <Grid item component="div">
                     <Link to={urls.home.path} variant="body2">
                        Главная
                     </Link>
                  </Grid>

                  <Grid item component="div">
                     <Link to={urls.login.path} variant="body2">
                        Уже есть аккаунт? Авторизоваться
                     </Link>
                  </Grid>
               </Grid>
            </form>
         </div>
      </Container>
   );
};

export default SignUp;
