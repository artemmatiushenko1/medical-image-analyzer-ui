import { MoreVertRounded } from '@mui/icons-material';
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Switch,
  Typography,
} from '@mui/material';

type ModelCardProps = {
  name: string;
};

const ModelCard = (props: ModelCardProps) => {
  const { name } = props;

  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack>
          <Typography variant="caption">Name</Typography>
          <Typography component="div" fontWeight={500} fontSize={16}>
            {name}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Switch color="success" size="small" />
          <IconButton>
            <MoreVertRounded />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export { ModelCard };
