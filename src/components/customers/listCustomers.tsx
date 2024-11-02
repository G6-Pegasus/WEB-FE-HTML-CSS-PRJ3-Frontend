
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CustomerHook } from '../../hooks/useGetCustomers';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'nit', headerName: 'NIT', width: 150, editable: true },
  { field: 'name', headerName: 'Name', width: 150, editable: true },
  { field: 'address', headerName: 'Address', width: 200, editable: true },
  { field: 'city', headerName: 'City', width: 120, editable: true },
  { field: 'country', headerName: 'Country', width: 120, editable: true },
  { field: 'phone', headerName: 'Phone', width: 150, editable: true },
  { field: 'email', headerName: 'Email', width: 200, editable: true },
  { field: 'active', headerName: 'Active', type: 'boolean', width: 100, editable: true },
];


function ClientTable() {
  const { data: rows = [], isLoading, isError } = CustomerHook();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading customers.</div>;
  console.log(rows);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
export default ClientTable;