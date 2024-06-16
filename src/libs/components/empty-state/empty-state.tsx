import { Stack, Typography } from '@mui/material';
import React from 'react';

type EmptyStateProps = {
  title: React.ReactNode;
  description: React.ReactNode;
  action?: React.ReactNode;
  fullHeight?: boolean;
  icon: React.ReactNode;
};

const EmptyState = (props: EmptyStateProps) => {
  const { title, description, action, fullHeight, icon } = props;

  return (
    <Stack
      alignItems="center"
      textAlign="center"
      justifyContent="center"
      sx={{ height: fullHeight ? '100%' : 'unset' }}
    >
      {icon}
      <Typography fontWeight={500} gutterBottom>
        {title}
      </Typography>
      <Typography variant="caption">{description}</Typography>
      {action}
    </Stack>
  );
};

export { EmptyState };
