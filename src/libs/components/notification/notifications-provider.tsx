import { SnackbarProvider } from 'notistack';
import { StyledMaterialDesignContent } from './styles';

const NotificationsProvider = () => {
  return (
    <SnackbarProvider
      autoHideDuration={2000}
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
        info: StyledMaterialDesignContent,
        warning: StyledMaterialDesignContent,
      }}
    />
  );
};

export { NotificationsProvider };
