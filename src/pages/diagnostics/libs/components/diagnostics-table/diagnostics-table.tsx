import { Loader } from '@/libs/components';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { columns } from './columns';
import { styles } from './styles';

type DiagnosticsTable = Pick<DataGridProps, 'rows' | 'loading' | 'onRowClick'>;

const DiagnosticsTable = (props: DiagnosticsTable) => {
  const { loading, rows, onRowClick } = props;

  return (
    <DataGrid
      loading={loading}
      slots={{ loadingOverlay: Loader }}
      sx={styles.root}
      disableColumnFilter
      disableColumnMenu
      disableColumnSelector
      disableRowSelectionOnClick
      rows={rows}
      columns={columns}
      onRowClick={onRowClick}
    />
  );
};

export { DiagnosticsTable };
