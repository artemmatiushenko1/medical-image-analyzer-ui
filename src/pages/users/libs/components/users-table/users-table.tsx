import { Loader } from '@/libs/components';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { styles } from './styles';

type UsersTableProps = Pick<DataGridProps, 'loading' | 'columns' | 'rows'>;

const UsersTable = (props: UsersTableProps) => {
  const { loading, rows, columns } = props;

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

export { UsersTable };
