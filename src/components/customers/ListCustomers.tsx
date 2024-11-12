import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowId, GridActionsCellItem, GridRowModesModel, GridRowModes } from '@mui/x-data-grid';
import { useGetCustomers } from '../../hooks/useGetCustomers';
import { Customer } from "../../utils/types";
import { useUpdateCustomer } from '../../hooks/useUpdateCustomer';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import TableSkeleton from '../common/TableSkeleton';
import ErrorComponent from '../common/ErrorComponent';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import ActiveIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Close';

function ClientTable() {
  const { data: rows = [], isLoading, isError } = useGetCustomers();
  const { mutate: updateCustomer, isSuccess, isError: isUpdateError } = useUpdateCustomer();
  const [dataRows, setDataRows] = useState<Customer[]>(rows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const navigate = useNavigate();

  useEffect(() => {
    setDataRows(rows);
  }, [rows]);

  const goToClientInfo = (id: GridRowId) => () => {
    navigate(`/customerDetails/${id}`)
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.Edit } }));
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View } }));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View, ignoreModifications: true } }));
  };

  const handleToggleActive = (id: GridRowId, currentActive: boolean) => () => {
    const updatedRows = dataRows.map((row) =>
      row.id === id ? { ...row, active: !currentActive } : row
    );
    setDataRows(updatedRows);
    updateCustomer({ id: Number(id),  data: { active: !currentActive } });
    if (isSuccess) Swal.fire("Updated!", "Customer has been successfully updated.", "success");
    if (isUpdateError) Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error updating customer. Please try again.",
    });
  };

  const processRowUpdate = (newRow: CustomerRow) => {
    setDataRows(dataRows.map((row) => (row.id === newRow.id ? newRow : row)));
    updateCustomer({ id: Number(newRow.id),  data: newRow });
    if (isSuccess) Swal.fire("Updated!", "Customer has been successfully updated.", "success");
    if (isUpdateError) Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error updating customer. Please try again.",
    });
    return newRow;
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'NIT', width: 150, editable: true },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'address', headerName: 'Address', width: 200, editable: true },
    { field: 'city', headerName: 'City', width: 120, editable: true },
    { field: 'country', headerName: 'Country', width: 120, editable: true },
    { field: 'phone', headerName: 'Phone', width: 150, editable: true },
    { field: 'corporateEmail', headerName: 'Email', width: 200, editable: true },
    {
      field: 'active',
      headerName: 'Active',
      type: 'boolean',
      width: 100,
      renderCell: (params) => (
        <span className={`px-2 py-1 font-semibold rounded-md ${params.value ? 'text-green-800 bg-green-200' : 'text-red-800 bg-red-200'}`}>
          {params.value ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      field: "actions",
      type: 'actions',
      headerName: "Actions",
      width: 150,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        const row = dataRows.find((r) => r.id === id);

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              color="primary"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<InfoIcon />}
            label="Info"
            onClick={goToClientInfo(id)}
            color="info"
          />,
          <GridActionsCellItem
            icon={row?.active ? <CancelIcon /> : <ActiveIcon />}
            label={row?.active ? "Deactivate" : "Activate"}
            onClick={handleToggleActive(id, row?.active ?? true)}
            color={row?.active ? "error" : "success"}
          />,
        ];
      }
    }
  ];

  if (isLoading) return <TableSkeleton rows={4} columns={7} />;
  if (isError) return <ErrorComponent message="An error occurred while fetching the information." />;

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={dataRows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        processRowUpdate={processRowUpdate}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default ClientTable;