import { Loader } from '@/libs/components';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import { styles } from './styles';
import { User } from '@/packages/users';
import { Trans, useTranslation } from 'react-i18next';

type UsersTableProps = Pick<DataGridProps, 'loading' | 'rows'>;

const UsersTable = (props: UsersTableProps) => {
  const { loading, rows } = props;

  const { t } = useTranslation('Users');

  const columns: GridColDef<User>[] = [
    {
      field: 'firstName',
      headerName: t('UsersTable.Columns.FirstName'),
      sortable: false,
      resizable: false,
      flex: 1,
    },
    {
      field: 'lastName',
      headerName: t('UsersTable.Columns.LastName'),
      sortable: false,
      resizable: false,
      flex: 1,
    },
    {
      field: 'email',
      headerName: t('UsersTable.Columns.Email'),
      sortable: false,
      resizable: false,
      flex: 1,
    },
  ];

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
      localeText={{
        MuiTablePagination: {
          labelRowsPerPage: t('UsersTable.RowsPerPage'),
          labelDisplayedRows: ({ from, to, count }) => (
            <Trans
              t={t}
              i18nKey="UsersTable.LabelDisplayedRows"
              values={{ from, to, count }}
            />
          ),
        },
      }}
    />
  );
};

export { UsersTable };
