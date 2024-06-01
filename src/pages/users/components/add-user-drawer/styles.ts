import { createStyleSheet } from '@/libs/theme';
import { ADD_USER_DRAWER_WIDTH_PX } from './constants';

const styles = createStyleSheet({
  root: {
    width: ADD_USER_DRAWER_WIDTH_PX,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: ADD_USER_DRAWER_WIDTH_PX,
    },
  },
  addUserDrawerPaper: {
    borderRadius: 0,
    borderTop: 'none',
  },
});

export { styles };
