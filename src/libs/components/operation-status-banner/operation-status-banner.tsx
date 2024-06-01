import { Button, Stack, Typography } from '@mui/material';
import { SuccessCheckmark } from '../success-checkmark';
import { motion } from 'framer-motion';

type OperationStatusBannerProps = {
  status: 'success' | 'error';
  onOkClick: () => void;
  okText?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
};

const OperationStatusBanner = (props: OperationStatusBannerProps) => {
  const { onOkClick, okText = 'Ok', title, description, status } = props;

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={3}
      sx={{
        position: 'absolute',
        inset: 0,
        height: '100%',
        background: ({ palette }) => palette.background.paper,
      }}
    >
      {status === 'error' && (
        <motion.svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.line
            x1="10"
            y1="10"
            x2="90"
            y2="90"
            stroke="black"
            strokeWidth="10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          <motion.line
            x1="90"
            y1="10"
            x2="10"
            y2="90"
            stroke="black"
            strokeWidth="10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </motion.svg>
      )}
      {status === 'success' && <SuccessCheckmark />}
      <Stack>
        <Typography variant="h6" fontSize={16} textAlign="center" gutterBottom>
          {title}
        </Typography>
        <Typography variant="caption" textAlign="center">
          {description}
        </Typography>
      </Stack>
      <Button size="small" variant="outlined" onClick={onOkClick}>
        {okText}
      </Button>
    </Stack>
  );
};

export { OperationStatusBanner };
