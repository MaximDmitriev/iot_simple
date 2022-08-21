// @ts-nocheck
import { useEffect, useReducer } from 'react';
import { LinearProgress } from '@mui/material';
import { reportReducer } from '../../reducers';
import { fetchService } from '../../services/fetch-data';
import { ErrorComponent } from '../error';
import { ListReport } from '../list-report';

const REPORT_NOT_IMPLEMENTED_MSG = 'Отчет не готов к использованию, выберите другой отчет';
const initState = {
  loaded: false,
  type: null,
  data: null,
  metadata: null,
  error: null,
};

export const ReportContainer = ({ url }) => {
  const [state, dispatch] = useReducer(reportReducer, initState);

  const getData = () => {
    dispatch({ type: 'fetchRequest' });
    fetchService
      .getReport(url)
      .then(res => {
        if (res) {
          dispatch({ type: 'fetchSuccess', payload: res });
        } else {
          console.log('error', res);
          dispatch({ type: 'fetchFailure', payload: { error: 'error' } });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: 'fetchFailure', payload: { error: err } });
      });
  };

  useEffect(() => {
    getData();
  }, [url]);

  const updateReport = () => {
    getData();
  };

  if (state.loaded && state.error) {
    return (
      <div>
        <ErrorComponent message={REPORT_NOT_IMPLEMENTED_MSG} />
      </div>
    );
  }

  return (
    <>
      {state.data ? (
        <div>{state.type === 'LIST' ? <ListReport data={state.data} metadata={state.metadata} update={updateReport} /> : null}</div>
      ) : null}
      {!state.loaded ? (
        <div>
          <LinearProgress />
        </div>
      ) : null}
    </>
  );
};
