import commonEn from './en/common.json';
import newStudyEn from './en/new-study.json';
import appEn from './en/app.json';
import diagnosticsEn from './en/diagnostics.json';
import usersEn from './en/users.json';

import commonUk from './uk/common.json';
import appUk from './uk/app.json';
import newStudyUk from './uk/new-study.json';
import usersUk from './uk/users.json';
import diagnosticsUk from './uk/diagnostics.json';

const resources = {
  en: {
    Common: commonEn,
    NewStudy: newStudyEn,
    App: appEn,
    Diagnostics: diagnosticsEn,
    Users: usersEn,
  },
  uk: {
    Common: commonUk,
    App: appUk,
    NewStudy: newStudyUk,
    Users: usersUk,
    Diagnostics: diagnosticsUk,
  },
} as const;

export { resources };
