import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { Paper, Typography } from '@material-ui/core';
import { ReportContainer } from '../components/report-container';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import { getCookie } from '../services/common';
import { roots } from '../services/constants';

import { useStyles } from './style/main-style';


export const MainPage = () => {
  const classes = useStyles();
  const location = useLocation();
  const auth = useAuth();
  const userCookie = getCookie('current_user');
  const user = userCookie ? JSON.parse(userCookie) : auth.user;

  const [report, setReport] = useState({
    type: 'start',
    name: 'Основная панель',
  });

  useEffect(() => {
    const restUrl = location.pathname.split('/');
    if (restUrl[1] === 'report' && restUrl[2]) {
      chooseReport(restUrl[2]);
    }
  }, []);

  const chooseReport = item => {
    const currentReport = roots.find(r => r.url === item);
    if (currentReport) {
      setReport({ type: currentReport.url, name: currentReport.name });
    }
  };


  return (
    <>
      <Navbar
        title={report.name}
        showBtn
        onSelectItem={chooseReport}
        name={user.name || user.username || ''}
      />
      {report.type === 'start'
        ? (
          <Paper elevation={5} className={classes.paper}>
            <Typography variant={'body1'} align={'center'}>
              Выберите в меню нужный отчет
            </Typography>
          </Paper>)
        : <ReportContainer url={report.type}/>}
    </>
  );
};
