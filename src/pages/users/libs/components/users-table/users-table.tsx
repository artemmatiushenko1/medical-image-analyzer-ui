import { Loader } from '@/libs/components';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { styles } from './styles';
import { columns } from './columns';

type UsersTableProps = Pick<DataGridProps, 'loading' | 'rows'>;

const UsersTable = (props: UsersTableProps) => {
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

export { UsersTable };
