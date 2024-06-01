import { Loader } from '@/libs/components';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import { styles } from './styles';
import { Diagnostic } from '@/packages/diagnostics';
import { useTranslation } from 'react-i18next';

type DiagnosticsTable = Pick<DataGridProps, 'rows' | 'loading' | 'onRowClick'>;

const DiagnosticsTable = (props: DiagnosticsTable) => {
  const { loading, rows, onRowClick } = props;

  const { t } = useTranslation('Diagnostics');

  const columns: GridColDef<Diagnostic>[] = [
    {
      field: 'name',
      headerName: t('DiagnosticsTable.Columns.Name'),
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
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
      onRowClick={onRowClick}
    />
  );
};

export { DiagnosticsTable };
