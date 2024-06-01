import { SvgIconComponent } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { styles } from './styles';

type DetailItemText = {
  iconComponent?: SvgIconComponent;
  children: React.ReactNode;
};
const DetailItemText = (props: DetailItemText) => {
  const { iconComponent: IconComponent, children } = props;

  return (
    <Box sx={styles.root}>
      {IconComponent && <IconComponent fontSize="inherit" />}
      <Typography variant="caption">{children}</Typography>
    </Box>
  );
};

export { DetailItemText };
