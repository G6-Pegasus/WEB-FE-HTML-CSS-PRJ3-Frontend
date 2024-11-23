import Box from '@mui/material/Box';
import { useState } from 'react';
import { DataGrid, GridColDef, GridRowId, GridActionsCellItem, GridRowModesModel } from '@mui/x-data-grid';
import { useGetOpportunities } from '../../hooks/useGetCustomerOpportunities';
import Swal from 'sweetalert2';
import TableSkeleton from '../common/TableSkeleton';
import ErrorComponent from '../common/ErrorComponent';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import InfoIcon from '@mui/icons-material/Info';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import { useDeleteOpportunity } from '../../hooks/useDeleteOpportunity';

const statusOptions = ['Done', 'Under study', 'Opening', 'Pending'];

function OpportunityTable() {
    const { data: rows = [], isLoading, isError, refetch } = useGetOpportunities();
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const { mutate: deleteOpportunity, isSuccess: isDeleteSuccess, isError: isDeleteError } = useDeleteOpportunity()
    const navigate = useNavigate();

    const goToOpportunityInfo = (id: GridRowId) => () => {
        navigate(`/opportunityDetails/${id}`)
    }

    const handleEditClick = (id: GridRowId) => () => {
        navigate(`/updateOpportunity/${id}`)
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will remove the opportunity from the list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteOpportunity(id as string)
            }
        })
        ;
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100, editable: false },
        { field: 'businessName', headerName: 'Business Name', width: 200, editable: true },
        { field: 'businessLine', headerName: 'Business Line', width: 150, editable: true },
        { field: 'description', headerName: 'Description', width: 300, editable: true },
        { field: 'estimatedBusinessValue', headerName: 'Value ($)', width: 150, type: 'number', editable: true },
        {
            field: 'estimatedCompletionDate',
            headerName: 'Completion Date',
            width: 150,
            editable: true,
            renderEditCell: (params) => (
                <DatePicker
                    value={dayjs(params.value)}
                    onChange={(newValue) => {
                        const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : '';
                        params.api.setEditCellValue({ id: params.id, field: 'estimatedCompletionDate', value: formattedDate });
                    }}
                    format="YYYY-MM-DD"
                />
            ),
        },
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
                    params.row.status === 'Under study' ? 'text-blue-900 bg-blue-500/20' :
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
                        onClick={goToOpportunityInfo(id)}
                        color="info"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            }
        },
    ];

    if (isDeleteSuccess) {
        Swal.fire("Deleted!", "The opportunity has been removed.", "success");
        refetch()
    }
    if (isDeleteError) {
        Swal.fire("ERROR!", "The entry could not be properly deleted.", "warning");
    }

    if (isLoading) return <TableSkeleton rows={4} columns={7} />;
    if (isError) return <ErrorComponent message="An error occurred while fetching the information. Contact technical support and show them this code: Error loading..." />;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ height: '85%', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={setRowModesModel}
                />
            </Box>
        </LocalizationProvider>
    );
}

export default OpportunityTable;