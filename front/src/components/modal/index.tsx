// @ts-nocheck
import { useEffect, useMemo, useState } from 'react';
import { Backdrop, Modal, Skeleton, Slide, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { fetchService } from '../../services/fetch-data';
import { PopupComponent } from '../popup';
import { WidgetContainer } from '../widgets';
import { ModalHeader } from './modal-header';
import { getSuccessMessage, getErrorMessage, createBody, defineMethod, updateSensors } from './utils';

export const ModalWrapper = ({ show, act, onClose, title, titleField, tableName, id, height, definition }) => {
  const [data, setData] = useState({});
  const [status, setStatus] = useState('loading'); // loaded, error
  const [popupOpen, setPopupOpen] = useState(false);
  const [mode, setMode] = useState(act);
  const { enqueueSnackbar } = useSnackbar();

  const formDefinition = useMemo(() => (mode === 'create' ? definition : definition.filter(c => !c.onlyCreatedMode)), [mode, definition]);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const onCloseHandler = () => {
    setStatus('loading');
    setData({});
    onClose();
  };

  const declineHandler = () => {
    setPopupOpen(false);
  };

  const updateWidgetData = (e, val, fieldName, fieldFormat) => {
    switch (fieldFormat) {
      case 'text':
        setData(data => ({ ...data, [fieldName]: val }));
        break;
      case 'datetime':
        setData(data => ({ ...data, [fieldName]: dayjs(e).valueOf() }));
        break;
      case 'deviceGroup':
        if (!data[fieldName]) {
          setData(data => ({ ...data, [fieldName]: [val] }));
        } else if (data[fieldName].includes(val)) {
          const idx = data[fieldName].indexOf(val);
          const values = [...data[fieldName].slice(0, idx), ...data[fieldName].slice(idx + 1)];

          setData(data => ({ ...data, [fieldName]: values }));
        } else {
          setData(data => ({ ...data, [fieldName]: data[fieldName].concat(val) }));
        }

        break;
      default:
        setData(data => ({ ...data, [fieldName]: val }));
    }
  };

  useEffect(() => {
    setMode(act);

    if (act === 'create') {
      setStatus('loaded');
    }
  }, [show]);

  useEffect(() => {
    if (mode === 'update' && id) {
      setStatus('loading');
      readRecord();
    }

    return () => {
      // console.log('unmount');
    };
  }, [id]);

  const readRecord = () => {
    fetchService
      .getOneRecord(tableName, id)
      .then(res => {
        setData(res);
        setTimeout(() => {
          // setTimeout для лоадера
          setStatus('loaded');
        }, 500);
      })
      .catch(err => {
        console.log(err);
        setStatus('error');
      });
  };

  const changeRecord = type => {
    const body = createBody(type, data);
    const method = defineMethod(type);

    updateSensors(enqueueSnackbar, type, tableName, data).then(() => {
      fetchService.data(body);
      method
        .call(fetchService, tableName)
        .then(res => {
          if (res.errors) {
            getErrorMessage(enqueueSnackbar, type, res.message);
          } else {
            if (type === 'create') {
              setData(res);
              setMode('update');
            } else if (type === 'delete') {
              setStatus('loading');
              setData({});
              onClose();
            }

            getSuccessMessage(enqueueSnackbar, type, data[titleField]);
          }
        })
        .catch(err => {
          console.log(err);
          getErrorMessage(enqueueSnackbar, type, err.message);
        });

      if (type === 'delete') setPopupOpen(false);
    });
  };

  return (
    <div>
      <PopupComponent open={popupOpen} onAccept={() => changeRecord('delete')} onCancel={declineHandler} />
      <Modal
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        open={show}
        onClose={onCloseHandler}
      >
        <Slide mountOnEnter unmountOnExit direction="down" in={show}>
          <div>
            <ModalHeader
              changeRecord={changeRecord}
              data={data}
              mode={mode}
              openPopup={openPopup}
              status={status}
              tableName={tableName}
              title={title}
              titleField={titleField}
            />
            <div style={{ height: height + 'px' }}>
              {formDefinition.map((cell, idx) => (
                <div
                  key={idx}
                  style={{
                    height: cell.height,
                    width: cell.width,
                    top: cell.top,
                    left: cell.left,
                  }}
                >
                  <Typography> {cell.label}</Typography>
                  {status === 'loading' ? (
                    <Skeleton height="40px" variant="rect" width="100%" />
                  ) : (
                    <WidgetContainer data={data[cell.fieldName] || null} definition={cell} updateData={updateWidgetData} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Slide>
      </Modal>
    </div>
  );
};
