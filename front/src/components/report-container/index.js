import React, { useEffect, useState } from 'react';

import { useStyles } from './style';
import { LinearProgress } from '@material-ui/core';

import FetchData from '../../services/fetchData';
import { ErrorComponent } from '../error';
import { ListReport } from '../list-report';

const REPORT_NOT_IMPLEMENTED_MSG = 'Отчет не готов к использованию, выберите другой отчет';


export const ReportContainer = ({ url }) => {
  const fetchData = new FetchData();
  const classes = useStyles();

  const [report, setReport] = useState({
    loaded: false,
    type: null,
    data: null,
    metadata: null
  });

  useEffect(() => {
    setReport({ ...report, loaded: false });

    // @TODO переделать на разные запросы по url
    fetchData.getReport(url).then(
      res => {
        if (res) {
          setReport({
            loaded: true,
            type: res.metadata.type,
            data: res.data,
            metadata: res.metadata
          });
        } else {
          console.log('error');
          setReport({ ...report, loaded: 'withError' });
        }
      }
    );
  },[url]);

  if (!report.loaded) {
    return (
      <div className={classes.progressContainer}>
        <LinearProgress className={classes.progress} />
      </div>
    )
  }

  if (report.loaded === 'withError') {
    return (
      <div className={classes.wrapper}>
        <ErrorComponent message={REPORT_NOT_IMPLEMENTED_MSG}/>
      </div>
    )
  }

  return (
    <div className={classes.wrapper}>
      {report.type === 'LIST' ? <ListReport data={report.data} metadata={report.metadata}/> : null}
    </div>
  )
}