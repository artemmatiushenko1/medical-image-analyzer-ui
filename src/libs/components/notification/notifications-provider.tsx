import { SnackbarProvider } from 'notistack';
import { StyledMaterialDesignContent } from './styles';

const NotificationsProvider = () => {
  return (
    <SnackbarProvider
      autoHideDuration={1000}
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
