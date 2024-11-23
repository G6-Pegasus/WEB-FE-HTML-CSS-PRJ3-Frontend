import Box from '@mui/material/Box';
import { useState } from 'react';
import { DataGrid, GridColDef, GridRowModel, GridRowModesModel } from '@mui/x-data-grid';
import { useGetFollowUps } from '../../hooks/useGetOpportunityFollowUps';
import TableSkeleton from '../common/TableSkeleton';
import ErrorComponent from '../common/ErrorComponent';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';

const statusOptions = ['Done', 'In Progress', 'Opening', 'Pending'];

function FollowUpsTable() {
    const { data: rows = [], isLoading, isError } = useGetFollowUps();
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const navigate = useNavigate()

    const handleClick = (row: GridRowModel) => {
        navigate(`/opportunityDetails/${row.row.opportunityId}`)
    }

    const columns: GridColDef[] = [
        { field: 'opportunityId', headerName: 'Opportunity', width: 100, editable: false },
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
        }
    ];

    if (isLoading) return <TableSkeleton rows={4} columns={7} />;
    if (isError) return <ErrorComponent message="An error occurred while fetching the information. Contact technical support and show them this code: Error loading..." />;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ height: '85%', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    onCellClick={handleClick}
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={setRowModesModel}
                />
            </Box>
        </LocalizationProvider>
    );
}

export default FollowUpsTable;