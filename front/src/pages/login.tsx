import type { FormEvent } from 'react';
import { useState } from 'react';
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FormControl, IconButton, InputAdornment, Paper, Slide, Stack, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useSnackbar } from 'notistack';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../app';
import Navbar from '../components/navbar';
import { setCookie } from '../services/common';

interface stateType {
  from: { pathname: string };
}

export const LoginPage = () => {
  const auth = useAuth();
  const history = useHistory();
  const location = useLocation<stateType>();
  const { enqueueSnackbar } = useSnackbar();

  const [values, setValues] = useState({
    login: '',
    password: '',
    showPassword: false,
  });

  const [type, setType] = useState({
    newUser: false,
  });

  const changeFormType = () => {
    setType({ newUser: !type.newUser });
  };

  const loginHandler = (event: FormEvent) => {
    event.preventDefault();

    const { from } = location.state || { from: { pathname: '/report' } };

    auth.signIn?.(values.login, values.password, props => {
      const { messages, token, name, login, roles } = props;

      messages?.forEach(message => enqueueSnackbar(message.msg, { variant: 'error', autoHideDuration: 8000 }));

      if (token) {
        setCookie('security_token', token);
        setCookie('current_user', JSON.stringify({ name, login, roles }));
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

  const handleMouseDownPassword = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <Navbar title={'Авторизация'} />
      <Grid2 container mt={8}>
        <Slide in mountOnEnter unmountOnExit direction={'right'} timeout={500}>
          <Grid2 xs={4} xsOffset={7}>
            <Paper elevation={3}>
              <form onSubmit={loginHandler}>
                <Box p={2}>
                  <Typography align={'center'} variant={'h6'}>
                    {type.newUser ? 'Регистрация нового пользователя' : 'Вход в аккаунт'}
                  </Typography>
                  <Stack mt={2} spacing={2}>
                    <FormControl>
                      <TextField
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          ),
                        }}
                        id="login"
                        label="Логин"
                        onChange={handleChange('login')}
                      />
                    </FormControl>
                    <FormControl>
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
                        id="password"
                        label="Пароль"
                        type={values.showPassword ? 'text' : 'password'}
                        onChange={handleChange('password')}
                      />
                    </FormControl>
                  </Stack>
                  <Stack mt={4} spacing={1}>
                    <Button color="primary" type="submit" variant="contained">
                      {type.newUser ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                    <Button variant="contained" onClick={changeFormType}>
                      {type.newUser ? 'Уже есть аккаунт' : 'Создать аккаунт'}
                    </Button>
                  </Stack>
                </Box>
              </form>
            </Paper>
          </Grid2>
        </Slide>
      </Grid2>
    </>
  );
};
