import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  paper: {
    height: '450px',
    width: '30%',
    minWidth: '300px',
    marginLeft: 'auto',
    marginRight: '100px',
    transform: 'translateY(100px)',
    padding: '30px 0',
  },
  inputWrapper: {
    display: 'flex',
    width: '85%',
    margin: 'auto',
    marginTop: '20px',
  },
  button: {
    display: 'block',
    width: '85%',
    margin: 'auto',
    marginBottom: '5px',
  },
  btnWrapper: {
    width: '100%',
    marginTop: '130px',
  },
}));
