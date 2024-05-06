import { DescriptionRounded, GridViewRounded } from '@mui/icons-material';
import { Box, Button, Theme, alpha } from '@mui/material';
import { styles } from './styles';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '@/libs/enums';
import { useTranslation } from 'react-i18next';

const ButtonsNavigation = () => {
  const { t } = useTranslation('App');
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      key: 'overview',
      path: AppRoute.HOME,
      icon: GridViewRounded,
      title: t('Sidebar.Overview'),
    },
    {
      key: 'studies',
      path: AppRoute.STUDIES,
      icon: DescriptionRounded,
      title: t('Sidebar.Studies'),
    },
  ];

  return (
    <Box sx={styles.root}>
      {navItems.map((navItem) => {
        const { title, icon: Icon, path } = navItem;
        const selected = Boolean(matchPath(path, location.pathname));

        const selectedStyles = ({ palette }: Theme) => ({
          backgroundColor: alpha(
            palette.primary.main,
            palette.action.selectedOpacity,
          ),
        });

        const inactiveStyles = ({ palette }: Theme) => ({
          color: palette.neutral.dark,
        });

        return (
          <Button
            key={path}
            onClick={() => navigate(path)}
            startIcon={
              <Icon
                sx={[
                  !selected && { color: ({ palette }) => palette.neutral.main },
                ]}
              />
            }
            sx={selected ? selectedStyles : inactiveStyles}
          >
            {title}
          </Button>
        );
      })}
    </Box>
  );
};

export { ButtonsNavigation };
