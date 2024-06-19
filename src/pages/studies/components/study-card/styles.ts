import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  root: {
    borderRadius: ({ shape }) => shape.borderRadius,
    p: 2,
    display: 'flex',
    alignItems: 'flex-start',
    gap: 3,
    ':hover': {
      '.view-study-button': {
        opacity: 1,
      },
    },
  },
  viewStudyButton: {
    transition: ({ transitions }) => transitions.create('opacity'),
    opacity: 0,
  },
  dateColumn: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    color: ({ palette }) => palette.neutral.dark,
  },
  imageWrapper: {
    width: '120px',
    height: '65px',
    overflow: 'hidden',
    borderRadius: ({ shape }) => shape.borderRadius,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  rightPart: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 3,
  },
});

export { styles };
