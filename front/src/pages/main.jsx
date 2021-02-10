import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/navbar';
import { Paper, Typography } from '@material-ui/core';
import { ReportContainer } from '../components/report-container';
import { useLocation } from 'react-router-dom';

import { useStyles } from './style/main-style';


const reportsList = [
  { url: 'users', name: 'Пользователи' },
  { url: 'sensors', name: 'Датчики' },
  { url: 'dashboards', name: 'Дашборды' },
];


export const MainPage = () => {
  const classes = useStyles();
  const location = useLocation();

  const [report, setReport] = useState({
    type: 'start',
    name: 'Основная панель',
  });

  const chooseReport = item => {
    const currentReport = reportsList.find(r => r.url === item);
    if (currentReport) {
      setReport({ type: currentReport.url, name: currentReport.name });
    }
  };
  useEffect(() => {
    const restUrl = location.pathname.split('/');
    if (restUrl[1] === 'report' && restUrl[2]) {
      chooseReport(restUrl[2]);
    }
  }, []);

  const onSelectItem = item => {
    chooseReport(item);
  };


  return (
    <>
      <Navbar
        title={report.name}
        showBtn
        userName="Максим Дмитриев"
        reports={reportsList}
        onSelectItem={item => onSelectItem(item)}
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
