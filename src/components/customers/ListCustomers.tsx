import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowModel } from '@mui/x-data-grid';
import { useGetCustomers } from '../../hooks/useGetCustomers';
import { Button } from "@mui/material";
import { Customer, CustomerRow } from "../../utils/types";
import { useUpdateCustomer } from '../../hooks/useUpdateCustomer'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function ClientTable() {
  const { data: rows = [], isLoading, isError } = useGetCustomers();
  const { mutate: updateCustomer, isSuccess, isError: isUpdateError } = useUpdateCustomer();
  const [dataRows, setDataRows] = useState<Customer[]>(rows)
  const navigate = useNavigate();

  useEffect(() => {
    setDataRows(rows)
  }, [rows])

  function handleUpdate(row: CustomerRow) {
    updateCustomer(row);
    if (isSuccess) Swal.fire("Updated!", "", "success");
    if (isUpdateError) Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something is wrong"
    });
  }

  async function handleToggleActive (customerRow: CustomerRow, isActive: boolean) {
    updateCustomer({ ...customerRow, active: !isActive });
    if (isSuccess) {
      Swal.fire("Updated!", "", "success");
      setDataRows((prevRows: Customer[]) =>
        prevRows.map((row) =>
          row.id === customerRow.id ? { ...row, active: !row.active } : row
        )
      );
    }
    if (isUpdateError) Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something is wrong"
    });
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, hideable: true },
    { field: 'nit', headerName: 'NIT', width: 150, editable: true },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'address', headerName: 'Address', width: 200, editable: true },
    { field: 'city', headerName: 'City', width: 120, editable: true },
    { field: 'country', headerName: 'Country', width: 120, editable: true },
    { field: 'phone', headerName: 'Phone', width: 150, editable: true },
    { field: 'corporateEmail', headerName: 'Email', width: 200, editable: true },
    { field: 'active', headerName: 'Active', type: 'boolean', width: 100, editable: false },
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
          className="w-[8rem]"
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
          className="w-[8rem]"
          sx={{ background: params.row.active ? '#f18f18' : '#68bc6c' }}
        >
          {params.row.active ? "Deactivate" : "Activate"}
        </Button>
      ),
    },
  ];

  const handleEditOption = (params: any) => {
    if (params.field === 'update' || params.field === 'toggleActive' || params.field === 'active' || params.field === "__check__") return;

    Swal.fire({
      text: "Do you want to edit this line? Press 'Cancel' to go to the customer page.",
      showCancelButton: true
    }).then(r => {
        if (r.isDismissed) navigate(`/customerDetails/${params.row.id}`);
    })
  };

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    if (!oldRow.active) {
      return oldRow;
    }
    return newRow;
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading customers.</div>;

  return (
    <Box sx={{
      width: '100%', // Ajuste del ancho en Material-UI
      height: '80%', // Ocupa la altura completa del contenedor padre
    }}
    className="overflow-auto">
      <DataGrid
        rows={dataRows}
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
        onCellClick={handleEditOption}
        getRowClassName={(params) => params.row.active ? '' : 'inactive-row'}
        sx={{
          '& .inactive-row': {
            backgroundColor: '#f8d7da', // Rojo claro
            '&:hover': {
              backgroundColor: '#f5c6cb', // Más oscuro en hover
            },
          },
        }}
        processRowUpdate={processRowUpdate}
      />
    </Box>
  );
}

export default ClientTable;
