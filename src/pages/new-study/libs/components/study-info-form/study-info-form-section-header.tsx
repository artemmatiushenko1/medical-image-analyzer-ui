import { HighlightedIcon } from '@/libs/components';
import { Box, Typography } from '@mui/material';

type StudyInfoFormSectionHeaderProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const StudyInfoFormSectionHeader = (props: StudyInfoFormSectionHeaderProps) => {
  const { title, description, icon } = props;

  return (
    <Box display="flex" gap={2}>
      <HighlightedIcon iconElement={icon} />
      <Box>
        <Typography variant="body2" fontWeight={500}>
          {title}
        </Typography>
        <Typography variant="caption">{description}</Typography>
      </Box>
    </Box>
  );
};

export { StudyInfoFormSectionHeader };
