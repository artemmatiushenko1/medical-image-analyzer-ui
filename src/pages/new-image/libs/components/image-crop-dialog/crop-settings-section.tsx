import { Stack, Typography } from '@mui/material';
import { styles } from './styles';

type CropSettingsSectionProps = {
  title: string;
  content: React.ReactNode;
};

const CropSettingsSection = (props: CropSettingsSectionProps) => {
  const { title, content } = props;

  return (
    <Stack sx={styles.settingsSectionRoot}>
      <Typography variant="subtitle2">{title}</Typography>
      {content}
    </Stack>
  );
};

export { CropSettingsSection };
