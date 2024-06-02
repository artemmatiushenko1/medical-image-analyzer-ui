import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 10,
        backgroundColor: ({ palette }) => palette.background.paper,
      }}
    >
      <motion.svg
        width="55"
        height="55"
        viewBox="0 0 55 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ scale: [1.2, 1.6, 1.2] }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <g clipPath="url(#clip0_7748_4343)">
          <path
            d="M13.75 0V13.75H0V41.25H13.75V55H41.25V41.25H55V13.75H41.25V0H13.75Z"
            fill="#FF5858"
          />
        </g>
        <path
          d="M26.6597 35.5708L25.3144 34.3608C20.5362 30.08 17.3816 27.2475 17.3816 23.7917C17.3816 20.9592 19.6269 18.75 22.4846 18.75C24.0989 18.75 25.6484 19.4925 26.6597 20.6567C27.671 19.4925 29.2205 18.75 30.8349 18.75C33.6925 18.75 35.9378 20.9592 35.9378 23.7917C35.9378 27.2475 32.7833 30.08 28.005 34.3608L26.6597 35.5708Z"
          fill="white"
        />
        <defs>
          <clipPath id="clip0_7748_4343">
            <rect width="55" height="55" fill="white" />
          </clipPath>
        </defs>
      </motion.svg>
    </Box>
  );
};

export { SplashScreen };
