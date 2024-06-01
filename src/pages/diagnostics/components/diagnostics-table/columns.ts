import { Diagnostic } from '@/packages/diagnostics';
import { GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<Diagnostic>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
  },
];

export { columns };
