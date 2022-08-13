import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    width: '90%',
    maxWidth: '1200px',
    minHeight: '300px',
    margin: '50px auto',
    backgroundColor: '#fff',
    paddingBottom: '10px',
    '&:focus': {
      outline: 'none',
    },
  },
  appbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '60px',
    padding: '10px 20px',
    marginBottom: '10px',
    backgroundColor: '#1976d2',
  },
  btnGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  headerBtn: {
    marginLeft: '10px',
  },
  title: {
    fontSize: '20px',
    marginRight: '10px',
  },
  grid: {
    position: 'relative',
    width: '100%',
  },
  displayName: {
    display: 'flex',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  name: {
    display: 'flex',
  },
  status: {
    display: 'flex',
  },
  statusText: {
    marginLeft: '7px',
  },
  titleMock: {
    minWidth: '100px',
  },
  cell: {
    position: 'absolute',
    borderRadius: '3px',
    padding: '5px 10px',
  },
  label: {
    fontSize: '14px',
  },
}));
