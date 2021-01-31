import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  textFieldRoot: {
    '& .Mui-disabled': {
      background: '#eaeaea',
      cursor: 'not-allowed',
    }
  },
  disabled: {
    background: '#eaeaea',
    userSelect: 'none',
    position: 'relative',
    '&::before': {
      position: 'absolute',
      content: 'no-open-quote',
      zIndex: 1500,
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      background: 'transparent',
      border: '1px solid #858585 !important',
      borderRadius: '4px',
      cursor: 'not-allowed',
      '&:hover': {
        border: '1px solid #858585 !important',
      }
    },
    '& div': {
      color: 'rgba(0, 0, 0, 0.4)',
    }
  }
}));