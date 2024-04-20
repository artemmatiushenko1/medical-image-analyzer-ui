import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  root: {
    flex: 1,
    padding: 4,
    gap: 7,
    paddingRight: 0,
    paddingTop: 0,
    alignSelf: 'flex-start',
  },
  sectionRoot: {
    gap: 2,
  },
  fieldsRow: {
    display: 'flex',
    gap: 2,
  },
});

export { styles };
