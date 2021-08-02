import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@material-ui/icons';
import Navbar from '../components/navbar';
import { useAuth } from '../App';
import { useSnackbar } from 'notistack';

import { useStyles } from './style/login-style';
import { setCookie } from '../services/common';


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
    auth.signIn(values.login, values.password,
      ({ message, token, username, login, role }) => {
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
      <Paper elevation={3} className={classes.paper}>
        <Typography variant={'h6'} align={'center'}>
          {type.newUser ? 'Регистрация нового пользователя' : 'Вход в аккаунт'}
        </Typography>
        <form onSubmit={login}>
          <FormControl className={classes.inputWrapper}>
            <TextField
              id="login"
              label="Логин"
              error={errors.login}
              helperText={errors.loginText}
              onChange={handleChange('login')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl className={classes.inputWrapper}>
            <TextField
              id="password"
              label="Пароль"
              type={values.showPassword ? 'text' : 'password'}
              error={errors.password}
              helperText={errors.passwordText}
              onChange={handleChange('password')}
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
            />
          </FormControl>
          <Box className={classes.btnWrapper}>
            <Button className={classes.button} color="primary" variant="contained" type='submit'>
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
