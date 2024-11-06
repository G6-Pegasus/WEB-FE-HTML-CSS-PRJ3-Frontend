import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowModel } from '@mui/x-data-grid';
import { useGetCustomers } from '../../hooks/useGetCustomers';
import { Button } from "@mui/material";
import { Customer, CustomerRow } from "../../utils/types";
import { useUpdateCustomer } from '../../hooks/useUpdateCustomer'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import TableSkeleton from '../common/TableSkeleton';
import ErrorComponent from '../common/ErrorComponent';

function ClientTable() {
  const { data: rows = [], isLoading, isError } = useGetCustomers();
  const { mutate: updateCustomer, isSuccess, isError: isUpdateError } = useUpdateCustomer();
  const [dataRows, setDataRows] = useState<Customer[]>(rows);
  const navigate = useNavigate();

  useEffect(() => {
    setDataRows(rows);
  }, [rows]);

  function handleUpdate(row: CustomerRow) {
    updateCustomer(row);
    if (isSuccess) Swal.fire("Updated!", "", "success");
    if (isUpdateError) Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something is wrong"
    });
  }

  async function handleToggleActive(customerRow: CustomerRow, isActive: boolean) {
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
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'NIT', width: 150, editable: true },
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
          className="bg-teal-500 w-full text-white px-4 py-2 text-xs font-semibold hover:bg-teal-600 rounded-md"
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
          onClick={() => handleToggleActive(params.row, params.row.active)}
          className={`w-full text-white px-4 py-2 text-xs font-semibold rounded-md ${
            params.row.active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {params.row.active ? "Deactivate" : "Activate"}
        </Button>
      ),
    },
  ];

  const handleEditOption = (params: any) => {
    if (['update', 'toggleActive', 'active', "__check__"].includes(params.field)) return;

    Swal.fire({
      text: "Do you want to edit this line? Press 'Cancel' to go to the customer page.",
      showCancelButton: true
    }).then(r => {
      if (r.isDismissed) navigate(`/customerDetails/${params.row.id}`);
    });
  };

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    if (!oldRow.active) {
      return oldRow;
    }
    return newRow;
  };

  if (isLoading) return <TableSkeleton rows={4} columns={7} />
  if (isError) return <ErrorComponent message={`An error occurred while fetching the information. Contact technical support and show them this code: Error loading customers.`} />

  return (
    <Box
      sx={{
        width: '100%',
        height: '80%',
        '& .MuiDataGrid-root': {
          backgroundColor: 'white',
          fontSize: '0.875rem',
        },
        '& .MuiDataGrid-cell': {
          padding: '8px',
          borderBottom: '1px solid #e0e0e0',
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#f5f5f5',
          color: '#374151',
          borderBottom: '1px solid #e0e0e0',
          fontWeight: 'bold',
          fontSize: '0.875rem',
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          textOverflow: 'clip',
          whiteSpace: 'normal',
          lineHeight: '1.2',
        },
        '& .inactive-row': {
          backgroundColor: '#fde2e2',
          '&:hover': {
            backgroundColor: '#fbb1b1',
          },
        },
      }}
      className="overflow-auto shadow-lg rounded-lg border border-slate-200"
    >
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
        processRowUpdate={processRowUpdate}
      />
    </Box>
  );
}

export default ClientTable;
