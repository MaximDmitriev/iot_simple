import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
  },
  button: {
    width: 'max-content',
    marginTop: '5px',
  },
  select: {
    width: '100%',
  },
}));
