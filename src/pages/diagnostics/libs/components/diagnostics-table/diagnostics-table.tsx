import { Loader } from '@/libs/components';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { columns } from './columns';
import { styles } from './styles';

type DiagnosticsTable = Pick<DataGridProps, 'rows' | 'loading'>;

const DiagnosticsTable = (props: DiagnosticsTable) => {
  const { loading, rows } = props;

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
    />
  );
};

export { DiagnosticsTable };
