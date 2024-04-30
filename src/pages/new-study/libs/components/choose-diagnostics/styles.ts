import { createStyleSheet } from '@/libs/theme';

const cardStyles = createStyleSheet({
  root: {
    borderRadius: ({ shape }) => shape.borderRadius,
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
    outline: ({ palette }) => `1px solid ${palette.divider}`,
    ':hover': {
      transform: 'scale(0.99)',
    },
    transition: 'transform 0.2s ease',
    aspectRatio: 3 / 2,
  },
  selected: {
    outline: ({ palette }) => `2px solid ${palette.primary.main}`,
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

const styles = createStyleSheet({
  root: {
    gap: 12,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    pt: 2,
  },
  diagnosticsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gridAutoRows: 'max-content',
    gap: 1.5,
    overflow: 'scroll',
    padding: '5px',
    overscrollBehavior: 'contain',
  },
  left: {
    flex: 1,
    gap: 2,
  },
  right: {
    flex: 1,
    overflow: 'auto',
  },
});

const selectedDiagnosticAccordion = createStyleSheet({
  root: {
    borderRadius: ({ shape }) => shape.borderRadius,
    '::before': {
      display: 'none',
    },
    '.delete-icon': {
      opacity: 0,
      transition: 'opacity 0.1s ease',
    },
    '&:hover': {
      '.delete-icon': {
        opacity: 1,
      },
    },
  },
});

export { styles, cardStyles, selectedDiagnosticAccordion };
