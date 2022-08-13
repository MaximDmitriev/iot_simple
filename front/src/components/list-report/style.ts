import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  wrapper: {
    overflow: 'auto',
    height: '100%',
    width: '100%',
    background: 'rgba(255,255,255,0.95)',
    position: 'relative',
    '& .MuiDataGrid-withBorder': {
      '&:last-child': {
        borderRight: 'none',
      },
    },
  },
  root: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    zIndex: 100,
  },
}));
