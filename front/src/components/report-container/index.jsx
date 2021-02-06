import React, { useEffect, useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import { ListReport } from '../list-report';
import { ErrorComponent } from '../error';
import { fetchService } from '../../services/fetchData';

import { useStyles } from './style';


const REPORT_NOT_IMPLEMENTED_MSG = 'Отчет не готов к использованию, выберите другой отчет';

export const ReportContainer = ({ url }) => {
  const classes = useStyles();

  const [report, setReport] = useState({
    loaded: false,
    type: null,
    data: null,
    metadata: null
  });

  const getData = () => { //@TODO вынести в хук
    setReport({ ...report, loaded: false });
    fetchService.getReport(url).then(
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
  };

  useEffect(() => {
    getData();
  },[]);

  const updateReport = () => {
    getData()
  }

  if (report.loaded === 'withError') {
    return (
      <div className={classes.wrapper}>
        <ErrorComponent message={REPORT_NOT_IMPLEMENTED_MSG}/>
      </div>
    )
  }

  return (
    <>
      {report.data
        ? (<div className={classes.wrapper}>
          {report.type === 'LIST' ? <ListReport data={report.data} metadata={report.metadata} update={updateReport}/> : null}
        </div>)
        : null
      }
      {!report.loaded
        ? (<div className={classes.progressContainer}>
            <LinearProgress className={classes.progress} />
          </div>)
        : null}
    </>
  )
}