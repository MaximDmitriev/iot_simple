// @ts-nocheck
import { useState } from 'react';
import { Box, Button, FormControl, IconButton, InputAdornment, Paper, TextField, Typography } from '@material-ui/core';
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import Navbar from '../components/navbar';
import { setCookie } from '../services/common';
import { useStyles } from './style/login-style';

export const LoginPage = () => {
  const classes = useStyles();
  const auth = useAuth();
  const history = useHistory();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const [values, setValues] = useState({
    login: '',
    password: '',
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    login: false,
    password: false,
    loginText: '',
    passwordText: '',
  });

  const [type, setType] = useState({
    newUser: false,
  });

  const changeFormType = () => {
    setType({ newUser: !type.newUser });
  };

  const login = e => {
    e.preventDefault();

    const { from } = location.state || { from: { pathname: '/report' } };

    auth.signIn(values.login, values.password, ({ message, token, username, login, role }) => {
      if (!token && message) enqueueSnackbar(message, { variant: 'error', autoHideDuration: 8000 });

      if (token) {
        setCookie('security_token', token);
        setCookie('current_user', JSON.stringify({ username, login, role }));
        history.replace(from);
      }
    });
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <>
      <Navbar title={'Авторизация'} />
      <Paper className={classes.paper} elevation={3}>
        <Typography align={'center'} variant={'h6'}>
          {type.newUser ? 'Регистрация нового пользователя' : 'Вход в аккаунт'}
        </Typography>
        <form onSubmit={login}>
          <FormControl className={classes.inputWrapper}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              error={errors.login}
              helperText={errors.loginText}
              id="login"
              label="Логин"
              onChange={handleChange('login')}
            />
          </FormControl>
          <FormControl className={classes.inputWrapper}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={errors.password}
              helperText={errors.passwordText}
              id="password"
              label="Пароль"
              type={values.showPassword ? 'text' : 'password'}
              onChange={handleChange('password')}
            />
          </FormControl>
          <Box className={classes.btnWrapper}>
            <Button className={classes.button} color="primary" type="submit" variant="contained">
              {type.newUser ? 'Зарегистрироваться' : 'Войти'}
            </Button>
            <Button className={classes.button} variant="contained" onClick={changeFormType}>
              {type.newUser ? 'Уже есть аккаунт' : 'Создать аккаунт'}
            </Button>
          </Box>
        </form>
      </Paper>
    </>
  );
};
