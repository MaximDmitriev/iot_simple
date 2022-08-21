// @ts-nocheck
import { Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';

export const NotFoundPage = () => (
  <>
    <Navbar title={''} />
    <Paper elevation={5}>
      <Typography align={'center'} variant={'h6'}>
        Страница не найдена
      </Typography>
      <Typography align={'center'} variant={'body1'}>
        Запрашиваемая страница не существует, проверьте правильность адреса
      </Typography>
      <Link to="/report">
        <Button color="primary" variant="contained">
          На главную
        </Button>
      </Link>
    </Paper>
  </>
);
