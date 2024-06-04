import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { GlobalStyles } from './global-styles';
import { typography } from './typography';
import { paletteDark, paletteLight } from './palette';
import { ThemeOptions, createTheme } from '@mui/material/styles';
import { getComponentsOverrides } from './components';
import { shape } from './shape';
import { useAppStore } from '@/app';
import { ThemeMode } from './enums';

type ThemeConfigProps = {
  children: React.ReactNode;
};

const ThemeConfig = ({ children }: ThemeConfigProps) => {
  const themeMode = useAppStore((state) => state.themeMode);

  const themeOptions = useMemo(() => {
    const palette = themeMode === ThemeMode.DARK ? paletteDark : paletteLight;

    return {
      typography,
      palette,
      components: getComponentsOverrides(palette),
      shape,
    } satisfies ThemeOptions;
  }, [themeMode]);

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
