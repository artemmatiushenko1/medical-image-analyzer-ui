import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const SuccessCheckmark = () => {
  return (
    <MotionBox
      variants={{
        initial: {
          scale: 0.5,
        },
        finished: {
          scale: 1,
          transition: {
            duration: 0.5,
            delayChildren: 0.1,
            type: 'spring',
            stiffness: 200,
          },
        },
      }}
      initial="initial"
      animate="finished"
      sx={{
        background: ({ palette }) => palette.success.main,
        borderRadius: '100px',
        color: '#fff',
        padding: '6px',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.svg
        viewBox="0 0 24 24"
        stroke="#fff"
        width="32px"
        height="32px"
        strokeWidth={0}
      >
        <motion.polyline
          fill="none"
          strokeLinecap="round"
          strokeWidth={2}
          points="6 13 10.2 16.6 18 7"
          variants={{
            initial: { pathLength: 0 },
            finished: {
              pathLength: 1,
              transition: { duration: 0.3, ease: 'easeIn' },
            },
          }}
        />
      </motion.svg>
    </MotionBox>
  );
};

export { SuccessCheckmark };
