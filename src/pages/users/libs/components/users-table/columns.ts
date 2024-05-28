import { User } from '@/packages/users';
import { GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<User>[] = [
  {
    field: 'firstName',
    headerName: 'First Name',
    sortable: false,
    resizable: false,
    flex: 1,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    sortable: false,
    resizable: false,
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email',
    sortable: false,
    resizable: false,
    flex: 1,
  },
];

export { columns };
