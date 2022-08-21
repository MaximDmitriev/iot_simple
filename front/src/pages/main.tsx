// @ts-nocheck
import { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../app';
import Navbar from '../components/navbar';
import { ReportContainer } from '../components/report-container';
import { getCookie } from '../services/common';
import { roots } from '../services/constants';

export const MainPage = () => {
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
      <Navbar showBtn name={user.name || user.username || ''} title={report.name} onSelectItem={chooseReport} />
      {report.type === 'start' ? (
        <Paper elevation={5}>
          <Typography align={'center'} variant={'body1'}>
            Выберите в меню нужный отчет
          </Typography>
        </Paper>
      ) : (
        <ReportContainer url={report.type} />
      )}
    </>
  );
};
