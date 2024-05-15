import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  paper: {
    borderTopLeftRadius: ({ shape }) => shape.borderRadius * 3,
    borderBottomLeftRadius: ({ shape }) => shape.borderRadius * 3,
    width: '500px',
  },
  titleInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    borderRadius: ({ shape }) => shape.borderRadius,
    overflow: 'hidden',
    height: 'auto',
    width: '450px',
    objectFit: 'contain',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block',
  },
});

export { styles };
