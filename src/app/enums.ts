const AppRoute = {
  ANY: '*',
  HOME: '/',
  SIGN_IN: '/sign-in',
  STUDIES: '/studies',
  NEW_STUDY: '/new-study',
  USERS: '/management/users',
  DIAGNOSTICS: '/management/diagnostics',
} as const;

const ThemeMode = {
  LIGHT: 'light',
  DARK: 'dark',
};

export { AppRoute, ThemeMode };
