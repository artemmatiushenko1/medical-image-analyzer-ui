import { mergeSx } from '@/libs/theme';
import { SxProps } from '@mui/material';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

type TableProps = DataGridProps;

const Table = (props: TableProps) => {
  return (
    <DataGrid
      {...props}
      sx={mergeSx(
        {
          '.MuiDataGrid-withBorderColor, &.MuiDataGrid-withBorderColor': {
            borderColor: ({ palette }) => `${palette.divider} !important`,
          },
        },
        props.sx as SxProps,
      )}
    />
  );
};

export { Table };
