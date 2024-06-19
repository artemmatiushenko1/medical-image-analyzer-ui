import { Loader, Table } from '@/libs/components';
import {
  DataGridProps,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from '@mui/x-data-grid';
import { styles } from './styles';
import { Diagnostic } from '@/packages/diagnostics';
import { Trans, useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { DeleteRounded } from '@mui/icons-material';
import { useDeleteDiagnostic } from '../../libs/queries';

type DiagnosticsTable = Pick<DataGridProps, 'rows' | 'loading' | 'onRowClick'>;

const DiagnosticsTable = (props: DiagnosticsTable) => {
  const { loading, rows, onRowClick } = props;

  const { t } = useTranslation('Diagnostics');

  const {
    mutate: deleteDiagnostic,
    isPending: isDeleteDiagnosticLoading,
    variables: deleteDiagnosticVariables,
  } = useDeleteDiagnostic();

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
    {
      type: 'actions',
      field: 'actions',
      getActions: (params: GridRowParams<Diagnostic>) => [
        <GridActionsCellItem
          key="delete"
          className="delete-button"
          disabled={isDeleteDiagnosticLoading}
          icon={
            isDeleteDiagnosticLoading &&
            deleteDiagnosticVariables === params.row.id ? (
              <Loader size="14px" />
            ) : (
              <DeleteRounded />
            )
          }
          label="Delete"
          onClick={() => deleteDiagnostic(params.row.id)}
        />,
      ],
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
