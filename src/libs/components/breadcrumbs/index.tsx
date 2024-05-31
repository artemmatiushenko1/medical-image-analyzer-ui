import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';

type BreadcrumbsProps = {
  segments: string[];
};

const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { segments } = props;

  return (
    <MuiBreadcrumbs>
      {segments.map((item, index) => (
        <Typography
          noWrap
          key={item}
          color={index === segments.length - 1 ? 'text.primary' : 'inherit'}
          sx={{ maxWidth: '200px' }}
        >
          {item}
        </Typography>
      ))}
    </MuiBreadcrumbs>
  );
};

export { Breadcrumbs };
