import { Stack, Typography } from '@mui/material';
import React from 'react';
import { motion } from 'framer-motion';

type NoResultsProps = {
  title: React.ReactNode;
  description: React.ReactNode;
  action?: React.ReactNode;
  fullHeight?: boolean;
};

const NoResults = (props: NoResultsProps) => {
  const { title, description, action, fullHeight } = props;

  const childVariants = { initial: { opacity: 0 }, animate: { opacity: 1 } };

  return (
    <Stack
      alignItems="center"
      textAlign="center"
      justifyContent="center"
      sx={{ height: fullHeight ? '100%' : 'unset' }}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M162 30H42C36.4772 30 32 34.4772 32 40V160C32 165.523 36.4772 170 42 170H162C167.523 170 172 165.523 172 160V40C172 34.4772 167.523 30 162 30Z"
          fill="#BFE1FF"
          fillOpacity="0.48"
        />
        <path
          d="M42 30.5H162C167.247 30.5 171.5 34.7533 171.5 40V160C171.5 165.247 167.247 169.5 162 169.5H42C36.7533 169.5 32.5 165.247 32.5 160V40C32.5 34.7533 36.7533 30.5 42 30.5Z"
          stroke="#BFE1FF"
          strokeOpacity="0.48"
        />
        <motion.g
          initial="initial"
          animate="animate"
          variants={{ initial: { y: 15 }, animate: { y: 0 } }}
          transition={{
            duration: 0.3,
            staggerChildren: 0.2,
            delayChildren: 0.1,
          }}
        >
          <path
            d="M147 179C147 180.657 145.657 182 144 182H60C58.3431 182 57 180.657 57 179V87.9966C57 86.3411 58.3527 85.027 59.979 84.7172C63.1124 84.1204 66.0208 82.5961 68.3084 80.3085C70.596 78.0209 72.1204 75.1124 72.7172 71.979C73.027 70.3527 74.3411 69 75.9966 69H127.994C129.653 69 130.969 70.3587 131.277 71.9891C131.48 73.0608 131.793 74.1114 132.213 75.1238C133.018 77.0648 134.2 78.8268 135.691 80.308C137.172 81.7991 138.934 82.9816 140.875 83.787C141.888 84.2071 142.939 84.5202 144.011 84.723C145.641 85.0315 147 86.3472 147 88.0067V179Z"
            fill="white"
          />
          <motion.g variants={childVariants}>
            <motion.path
              d="M102 131C115.255 131 126 120.255 126 107C126 93.7452 115.255 83 102 83C88.7452 83 78 93.7452 78 107C78 120.255 88.7452 131 102 131Z"
              fill="#3C79FE"
            />
            <motion.path
              d="M100.267 115.522C102.543 115.521 104.754 114.759 106.548 113.356L112.186 119L114 117.185L108.359 111.538C109.776 109.704 110.531 107.444 110.501 105.125C110.47 102.807 109.656 100.567 108.191 98.7712C106.726 96.9752 104.696 95.7288 102.433 95.2352C100.17 94.7416 97.8062 95.0299 95.7275 96.053C93.6488 97.0762 91.9776 98.7739 90.9862 100.869C89.9949 102.965 89.7418 105.335 90.2683 107.593C90.7948 109.851 92.0697 111.864 93.8854 113.304C95.7011 114.743 97.9504 115.525 100.267 115.522ZM100.267 97.5441C101.79 97.5441 103.279 97.9962 104.546 98.8434C105.812 99.6905 106.8 100.895 107.382 102.303C107.965 103.712 108.118 105.262 107.821 106.757C107.524 108.253 106.79 109.627 105.713 110.705C104.636 111.783 103.263 112.517 101.769 112.815C100.275 113.112 98.7268 112.959 97.3195 112.376C95.9121 111.792 94.7093 110.804 93.863 109.537C93.0167 108.269 92.565 106.778 92.565 105.253C92.565 103.209 93.3764 101.248 94.8208 99.8021C96.2652 98.3563 98.2242 97.5441 100.267 97.5441Z"
              fill="white"
            />
          </motion.g>
          <motion.path
            opacity="0.3"
            d="M115 137H89C87.3431 137 86 138.343 86 140C86 141.657 87.3431 143 89 143H115C116.657 143 118 141.657 118 140C118 138.343 116.657 137 115 137Z"
            fill="#3C79FE"
            variants={{
              initial: childVariants.initial,
              animate: { opacity: 0.3 },
            }}
          />
          <motion.path
            opacity="0.15"
            d="M124 149H80C78.3431 149 77 150.343 77 152C77 153.657 78.3431 155 80 155H124C125.657 155 127 153.657 127 152C127 150.343 125.657 149 124 149Z"
            fill="#3C79FE"
            variants={{
              initial: childVariants.initial,
              animate: { opacity: 0.15 },
            }}
          />
        </motion.g>
      </svg>
      <Typography fontWeight={500} gutterBottom>
        {title}
      </Typography>
      <Typography variant="caption">{description}</Typography>
      {action}
    </Stack>
  );
};

export { NoResults };