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
          key={item}
          color={index === segments.length - 1 ? 'text.primary' : 'inherit'}
        >
          {item}
        </Typography>
      ))}
    </MuiBreadcrumbs>
  );
};

export { Breadcrumbs };
