import { GlobalStyles as GlobalThemeStyles } from '@mui/material';

const GlobalStyles = () => {
  return (
    <GlobalThemeStyles
      styles={{
        '*': {
          margin: 0,
          padding: 0,
          '&::-webkit-scrollbar': {
            width: '4px',
            height: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '100px',
            backgroundClip: 'padding-box',
            backgroundColor: '#c2c2c2',
          },
        },
        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
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
