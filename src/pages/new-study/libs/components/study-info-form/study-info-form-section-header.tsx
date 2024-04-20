import { Box, Typography, alpha } from '@mui/material';

type StudyInfoFormSectionHeaderProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const StudyInfoFormSectionHeader = (props: StudyInfoFormSectionHeaderProps) => {
  const { title, description, icon } = props;

  return (
    <Box display="flex" gap={2}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          background: ({ palette }) =>
            alpha(palette.primary.main, palette.action.selectedOpacity),
          borderRadius: ({ shape }) => shape.borderRadius,
        }}
      >
        {icon}
      </Box>
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
