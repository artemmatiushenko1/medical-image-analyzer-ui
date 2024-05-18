import {
  ButtonProps as MuiButtonProps,
  Button as MuiButton,
  CircularProgress,
} from '@mui/material';

type ButtonProps = MuiButtonProps & { isLoading?: boolean };

const Button = (props: ButtonProps) => {
  const { isLoading, ...restProps } = props;

  return (
    <MuiButton
      {...restProps}
      disabled={isLoading || restProps.disabled}
      startIcon={
        isLoading ? (
          <CircularProgress
            size="12px"
            disableShrink
            sx={{ color: 'inherit', animationDuration: '550ms' }}
          />
        ) : (
          restProps.startIcon
        )
      }
    />
  );
};

export { Button };
