import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { GlobalStyles } from './global-styles';
import { typography } from './typography';
import { palette } from './palette';
import { ThemeOptions, createTheme } from '@mui/material/styles';
import { components } from './components';
import { shape } from './shape';

type ThemeConfigProps = {
  children: React.ReactNode;
};

const ThemeConfig = ({ children }: ThemeConfigProps) => {
  const themeOptions = useMemo(
    () =>
      ({
        typography,
        palette,
        components,
        shape,
      } satisfies ThemeOptions),
    [],
  );

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export { ThemeConfig };
