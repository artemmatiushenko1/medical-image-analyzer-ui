import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  root: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
  },
  progressWrapper: {
    position: 'relative',
  },
  progressValueTrack: {
    strokeLinecap: 'round',
    position: 'absolute',
    inset: 0,
  },
  progressPercentage: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { styles };
