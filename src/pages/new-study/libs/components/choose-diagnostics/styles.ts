import { createStyleSheet } from '@/libs/theme';

const cardStyles = createStyleSheet({
  root: {
    width: '49%',
    height: '155px',
    minWidth: '255px',
    borderRadius: ({ shape }) => shape.borderRadius,
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
    border: ({ palette }) => `1px solid ${palette.divider}`,
    ':hover': {
      transform: 'scale(0.99)',
    },
    transition: 'transform 0.2s ease',
    aspectRatio: 3 / 2,
  },
  selected: {
    border: ({ palette }) => `1px solid ${palette.primary.main}`,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  selectedIconWrapperAbsolute: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1,
  },
  selectedIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '22px',
    height: '22px',
    color: '#fff',
    background: ({ palette }) => palette.primary.main,
    borderRadius: '2px',
  },
  selectedIcon: {
    width: '19px',
    height: '19px',
  },
  infoOverlay: {
    position: 'absolute',
    padding: '15px',
    inset: 0,
    backgroundImage:
      'linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))',
    display: 'flex',
    alignItems: 'end',
  },
  title: {
    color: 'white',
    fontSize: '14px',
  },
});

export { cardStyles };
