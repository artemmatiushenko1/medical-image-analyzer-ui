import { Loader, Table } from '@/libs/components';
import { DataGridProps, GridColDef } from '@mui/x-data-grid';
import { styles } from './styles';
import { User } from '@/packages/users';
import { Trans, useTranslation } from 'react-i18next';

type UsersTableProps = Pick<DataGridProps, 'loading' | 'rows'>;

const UsersTable = (props: UsersTableProps) => {
  const { loading, rows } = props;

  const { t } = useTranslation('Users');

  const columns: GridColDef<User>[] = [
    {
      field: 'name',
      headerName: t('UsersTable.Columns.Name'),
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
    <Table
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
