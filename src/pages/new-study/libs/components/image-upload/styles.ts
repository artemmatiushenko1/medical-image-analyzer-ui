import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  root: {
    gap: 1,
  },
  // imageUploadHints: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  // },
  uploadedImgWrapper: {
    width: '450px',
    height: '450px',
    borderRadius: ({ shape }) => shape.borderRadius,
    overflow: 'hidden',
  },
  uploadedImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
});

export { styles };
