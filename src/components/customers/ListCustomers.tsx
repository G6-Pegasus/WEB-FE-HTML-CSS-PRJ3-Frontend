import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetCustomers } from '../../hooks/useGetCustomers';
import { Button } from "@mui/material";
import { CustomerRow } from "../../utils/types";
import { updateCustomer } from '../../services/customerServices';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'nit', headerName: 'NIT', width: 150, editable: true },
  { field: 'name', headerName: 'Name', width: 150, editable: true },
  { field: 'address', headerName: 'Address', width: 200, editable: true },
  { field: 'city', headerName: 'City', width: 120, editable: true },
  { field: 'country', headerName: 'Country', width: 120, editable: true },
  { field: 'phone', headerName: 'Phone', width: 150, editable: true },
  { field: 'corporateEmail', headerName: 'Email', width: 200, editable: true },
  { field: 'active', headerName: 'Active', type: 'boolean', width: 100, editable: true },
  {
    field: "update",
    headerName: "Update",
    width: 150,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleUpdate(params.row)}
        sx={{ background: '#40b09f' }}
        className={`w-[8rem]`}
      >
        Update
      </Button>
    ),
  },
  {
    field: "toggleActive",
    headerName: "Activate/Deactivate",
    width: 150,
    renderCell: (params) => (
      <Button
        variant="contained"
        color={params.row.active ? "error" : "success"}
        onClick={() => handleToggleActive(params.row, params.row.active)}
        className={`w-[8rem]`}
        sx={{ background: params.row.active ? '#f18f18' : '#68bc6c' }}
      >
        {params.row.active ? "Deactivate" : "Activate"}
      </Button>
    ),
  },
];



async function handleUpdate(row: CustomerRow) {
  try {
    const response = await updateCustomer(row);
    console.log('Update successful:', response.data);
  } catch (error) {
    console.error('Error updating customer:', error);
  }
}

async function handleToggleActive(row: CustomerRow, isActive: boolean) {
    await handleUpdate({ ...row, active: !isActive })
}

function ClientTable() {
  const { data: rows = [], isLoading, isError } = useGetCustomers();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading customers.</div>;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto', width: '80%' }}>
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