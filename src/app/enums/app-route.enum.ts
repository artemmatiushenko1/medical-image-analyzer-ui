const AppRoute = {
  ANY: '*',
  HOME: '/',
  SIGN_IN: '/sign-in',
  STUDIES: '/studies',
  NEW_STUDY: '/new-study',
  USERS: '/management/users',
  DIAGNOSTICS: '/management/diagnostics',
} as const;

export { AppRoute };
