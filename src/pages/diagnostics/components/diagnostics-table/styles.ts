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
    '.MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      px: 3,
    },
    '.MuiDataGrid-row': {
      '.delete-button': {
        opacity: 0,
      },
      '&:hover': {
        '.delete-button': {
          opacity: 1,
        },
      },
    },
  },
});

export { styles };
