import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.1)',
  },
  progress: {
    marginTop: '15px',
    height: '6px',
    width: '200px',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    height: 'calc(100% - 64px)',
    padding: '20px 0',
  },
}));
