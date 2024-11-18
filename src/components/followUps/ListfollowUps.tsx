import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowModel, GridRowId, GridActionsCellItem, GridRowModesModel, GridRowModes } from '@mui/x-data-grid';
import { useGetFollowUps } from '../../hooks/useGetOpportunityFollowUps';
import { FollowUp } from "../../utils/types";
import Swal from 'sweetalert2';
import TableSkeleton from '../common/TableSkeleton';
import ErrorComponent from '../common/ErrorComponent';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate} from 'react-router-dom';
import UpdateDialog from './UpdateFollowDialog';

const statusOptions = ['Done', 'In Progress', 'Opening', 'Pending'];

function FollowUpsTable() {
    const { data: rows = [], isLoading, isError, refetch } = useGetFollowUps();
    const [dataRows, setDataRows] = useState<FollowUp[]>(rows);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [openDialog, setOpenDialog] = useState(false); 
    const [selectedRowId, setSelectedRowId] = useState<GridRowId | null>(null); 
    const navigate = useNavigate();
    useEffect(() => {
        setDataRows(rows)
    }, [rows])

    const handleEditClick = (id: GridRowId) => () => {
        setSelectedRowId(id)
        setOpenDialog(true)
    }
    const handleDialogClose = () => {
        setOpenDialog(false)
        setSelectedRowId(null)
        refetch()
    }

    const handleSaveClick = (id: GridRowId) => () => {
        Swal.fire({
            text: "Do you want to edit this line? Press 'Cancel' to go to the follow ups page.",
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View } }));
            } else {
                navigate(`/FollowUpsDetails/${id}`);
            }
        });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will remove the follow up from the list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://web-fe-html-css-prj3-backend.onrender.com/followUps/${id}`, {
                    method: 'DELETE',
                })
                .then((response) => {
                    if (response.ok) {
                        setDataRows(dataRows.filter((row) => row.id !== id));
                        Swal.fire("Deleted!", "The follow up has been removed.", "success");
                    } else {
                        Swal.fire("Error!", "Failed to delete the opportunity.", "error");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting opportunity:", error);
                    Swal.fire("ERROR!", "The entry could not be properly deleted.", "warning");
                });
            }
        });
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View, ignoreModifications: true } }));
        navigate(`/opportunityDetails/${id}`);
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        Swal.fire({
            text: "Do you want to edit this line? Press 'Cancel' to go to the follow ups page.",
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                setDataRows(dataRows.map((row) => (row.id === newRow.id ? (newRow as FollowUp) : row)));
            } else {
                navigate(`/FollowUpsDetails/${newRow.id}`);
            }
        });
        return newRow;
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100, editable: false },
        { field: 'contactType', headerName: 'Contact Type', width: 200, editable: true },
        {
            field: 'contactDate',
            headerName: 'Contact Date',
            width: 150,
            editable: true,
            renderEditCell: (params) => (
                <DatePicker
                    value={dayjs(params.value)}
                    onChange={(newValue) => {
                        const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : '';
                        params.api.setEditCellValue({ id: params.id, field: 'contactDate', value: formattedDate });
                    }}
                    format="YYYY-MM-DD"
                />
            ),
        },
        { field: 'commercialExecutive', headerName: 'Commercial Executive', width: 200, editable: true },
        { field: 'description', headerName: 'Description', width: 300, editable: true },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            editable: true,
            type: 'singleSelect',
            valueOptions: statusOptions,
            renderCell: (params) => (
                <div className={`my-3 px-2 py-1 font-bold text-xs uppercase rounded-md select-none whitespace-nowrap ${
                    params.row.status === 'Done' ? 'text-green-900 bg-green-500/20' :
                    params.row.status === 'In Progress' ? 'text-blue-900 bg-blue-500/20' :
                    params.row.status === 'Opening' ? 'text-purple-900 bg-purple-500/20' :
                    params.row.status === 'Pending' ? 'text-yellow-900 bg-yellow-500/20' : ''
                }`}>
                    {params.row.status}
                </div>
            ),
        },
        {
            field: "actions",
            type: 'actions',
            headerName: "Actions",
            width: 200,
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
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
                        label="Update Follow-Up"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete Follow-Up"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            }
        },
    ];

    if (isLoading) return <TableSkeleton rows={4} columns={7} />;
    if (isError) return <ErrorComponent message="An error occurred while fetching the information. Contact technical support and show them this code: Error loading..." />;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={dataRows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={setRowModesModel}
                    processRowUpdate={processRowUpdate}
                />
            </Box>
            {selectedRowId && (
                <UpdateDialog
                    open={openDialog}
                    onClose={handleDialogClose}
                    followUpId={selectedRowId?.toString() || ''}
                />
            )}
        </LocalizationProvider>
    );
}

export default FollowUpsTable;