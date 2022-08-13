import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  wrapper: {
    width: '100%',
    height: 'calc(100% - 22px)',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    overflow: 'hidden',
    '&:hover $overlay': {
      transform: 'translateX(0)',
    },
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    transition: '0.6s',
    transform: 'translateX(-100%)',
  },
  list: {
    padding: '10px 0',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '16px',
    fontFamily: 'Roboto',
    cursor: 'pointer',
    textTransform: 'uppercase',
    padding: '5px 10px',
    transition: '0.2s',
    '&:hover': {
      background: '#292F33',
    },
  },
  icon: {
    marginRight: '10px',
  },
}));
