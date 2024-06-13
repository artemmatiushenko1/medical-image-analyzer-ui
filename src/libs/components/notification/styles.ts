import { styled } from '@mui/material';
import { MaterialDesignContent } from 'notistack';

const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  ({ theme: { palette } }) => ({
    '&.notistack-MuiContent-success': {
      backgroundColor: palette.success.main,
    },
    '&.notistack-MuiContent-error': {
      backgroundColor: palette.error.main,
    },
    '&.notistack-MuiContent-info': {
      backgroundColor: palette.info.main,
    },
    '&.notistack-MuiContent-warning': {
      backgroundColor: palette.warning.main,
    },
  }),
);

export { StyledMaterialDesignContent };
