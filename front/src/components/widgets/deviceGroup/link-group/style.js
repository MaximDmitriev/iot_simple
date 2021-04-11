import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    height: '100%',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    overflow: 'auto',
    marginRight: '15px',
  },
  list: {
    width: '100%',
    padding: '10px 0',
    listStyle: 'none',
  },
  listItem: {
    width: '100%',
    height: '40px',
    padding: '3px 0',
  },
  element: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '0 8px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    backgroundColor: '#dcdcde',
    cursor: 'pointer',
    transition: '0.2s',
    overflow: 'hidden',
    '&:hover': {
      backgroundColor: '#c3c4c7',
    },
    '&:hover $closeButton': {
      transform: 'translateX(0)',
    },
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    backgroundColor: '#1d2327',
    color: '#fff',
    transition: '0.4s',
    transform: 'translateX(40px)',
  },
}));

