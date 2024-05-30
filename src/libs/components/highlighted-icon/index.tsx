import { Box, alpha } from '@mui/material';

type HighlightedIcon = {
  iconElement: React.ReactNode;
  rounded?: boolean;
};

const HighlightedIcon = (props: HighlightedIcon) => {
  const { iconElement, rounded } = props;

  return (
    <Box
      sx={{
        width: '40px',
        height: '40px',
        color: ({ palette }) => palette.primary.main,
        background: ({ palette }) =>
          alpha(palette.primary.main, palette.action.selectedOpacity),
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
