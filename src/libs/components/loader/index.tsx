import { CircularProgress, CircularProgressProps } from '@mui/material';

type LoaderProps = CircularProgressProps;

const Loader = (props: LoaderProps) => {
  return (
    <CircularProgress
      {...props}
      disableShrink
      sx={{ ...props.sx, animationDuration: '550ms' }}
    />
  );
};

export { Loader };
