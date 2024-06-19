import { Box, alpha, useTheme } from '@mui/material';

type HighlightedIcon = {
  iconElement: React.ReactNode;
  rounded?: boolean;
  color?: string;
};

const HighlightedIcon = (props: HighlightedIcon) => {
  const { iconElement, rounded } = props;

  const { palette } = useTheme();

  const color = props.color ?? palette.primary.main;

  return (
    <Box
      sx={{
        width: '40px',
        height: '40px',
        color,
        background: ({ palette }) =>
          alpha(color, palette.action.selectedOpacity),
        borderRadius: ({ shape }) => (rounded ? '100px' : shape.borderRadius),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {iconElement}
    </Box>
  );
};

export { HighlightedIcon };
