import { PersonRounded } from '@mui/icons-material';
import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';

type TotalUsersWidgetProps = {
  count: number;
  loading?: boolean;
};

const TotalUsersWidget = (props: TotalUsersWidgetProps) => {
  const { count, loading } = props;

  return (
    <Card variant="outlined" sx={{ maxWidth: '250px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonRounded
            sx={{ color: ({ palette }) => palette.neutral.main }}
          />
          {loading ? (
            <Skeleton animation="wave" width={100} height={32} />
          ) : (
            <Typography variant="h6" fontWeight={600}>
              {count}
            </Typography>
          )}
        </Box>
        <Typography variant="caption">Total Users</Typography>
      </CardContent>
    </Card>
  );
};

export { TotalUsersWidget };
