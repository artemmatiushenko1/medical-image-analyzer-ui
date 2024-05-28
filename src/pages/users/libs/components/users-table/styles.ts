import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  root: {
    overflow: 'hidden',
    borderRadius: ({ shape }) => shape.borderRadius,
    background: ({ palette }) => palette.background.paper,
    '.MuiDataGrid-overlayWrapperInner': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

export { styles };
