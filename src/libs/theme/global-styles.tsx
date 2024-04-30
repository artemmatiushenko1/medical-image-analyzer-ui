import { GlobalStyles as GlobalThemeStyles } from '@mui/material';

const GlobalStyles = () => {
  return (
    <GlobalThemeStyles
      styles={{
        '*': {
          margin: 0,
          padding: 0,
        },
        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
          scrollbarColor: 'rgba(0,0,0,.2) transparent',
        },
        body: {
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
      }}
    />
  );
};

export { GlobalStyles };
