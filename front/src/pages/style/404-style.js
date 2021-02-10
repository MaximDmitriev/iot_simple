import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '650px',
    height: '200px',
    margin: 'auto',
    marginTop: '100px',
    padding: '30px',
  },
  button: {
    width: '200px',
  },
  text: {
    margin: '10px 0',
  },
}));
