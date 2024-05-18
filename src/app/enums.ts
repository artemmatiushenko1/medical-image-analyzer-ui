const AppRoute = {
  ANY: '*',
  HOME: '/',
  SIGN_IN: '/sign-in',
  STUDIES: '/studies',
  NEW_STUDY: '/new-study',
  USERS: '/managment/users',
  DIAGNOSTICS: '/managment/diagnostics',
} as const;

export { AppRoute };
