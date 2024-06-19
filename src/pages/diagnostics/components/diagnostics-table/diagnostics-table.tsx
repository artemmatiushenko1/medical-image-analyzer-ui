import { Loader, Table } from '@/libs/components';
import { DataGridProps, GridColDef } from '@mui/x-data-grid';
import { styles } from './styles';
import { Diagnostic } from '@/packages/diagnostics';
import { Trans, useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

type DiagnosticsTable = Pick<DataGridProps, 'rows' | 'loading' | 'onRowClick'>;

const DiagnosticsTable = (props: DiagnosticsTable) => {
  const { loading, rows, onRowClick } = props;

  const { t } = useTranslation('Diagnostics');

  const columns: GridColDef<Diagnostic>[] = [
    {
      field: 'name',
      headerName: t('DiagnosticsTable.Columns.Name'),
      flex: 0.4,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: 'description',
      headerName: t('DiagnosticsTable.Columns.Description'),
      flex: 0.6,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (value) => (
        <Typography noWrap fontSize="inherit">
          {value.row.description ? value.row.description : '-'}
        </Typography>
      ),
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
      onRowClick={onRowClick}
      localeText={{
        MuiTablePagination: {
          'labelRowsPerPage': t('DiagnosticsTable.RowsPerPage'),
          labelDisplayedRows: ({ to, from, count }) => (
            <Trans
              t={t}
              i18nKey="DiagnosticsTable.LabelDisplayedRows"
              values={{ from, to, count }}
            />
          ),
        },
      }}
    />
  );
};

export { DiagnosticsTable };
