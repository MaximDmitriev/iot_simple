import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    width: '90%',
    minHeight: '300px',
    margin: '50px auto',
    backgroundColor: '#fff',
    '&:focus': {
      outline: 'none'
    }
  },
  appbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '60px',
    padding: '10px 20px',
    backgroundColor: '#1976d2'
  },
  btnGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  headerBtn: {
    marginLeft: '10px'
  },
  title: {
    fontSize: '20px',
    marginRight: '10px',
  },
  grid: {
    width: '100%',
    padding: '20px'
  },
  displayName: {
    display: 'flex',
    height: '100%',
    alignItems: 'center'
  },
  titleMock: {
    minWidth: '100px'
  }

}));