import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowModel } from '@mui/x-data-grid';
import { useGetOpportunities } from '../../hooks/useGetCustomerOpportunities';
import { Button } from "@mui/material";
import { Opportunity } from "../../utils/types";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import TableSkeleton from '../common/TableSkeleton';
import ErrorComponent from '../common/ErrorComponent';

function OpportunityTable() {
    const { data: rows = [], isLoading, isError } = useGetOpportunities();
    const [dataRows, setDataRows] = useState<Opportunity[]>(rows);
    const navigate = useNavigate();

    useEffect(() => {
        setDataRows(rows);
    }, [rows]);


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100, editable: false },
        { field: 'businessName', headerName: 'Business Name', width: 200, editable: true },
        { field: 'businessLine', headerName: 'Business Line', width: 150, editable: true },
        { field: 'description', headerName: 'Description', width: 300, editable: true },
        { field: 'estimatedBusinessValue', headerName: 'Value ($)', width: 150, type: 'number', editable: true },
        { field: 'estimatedCompletionDate', headerName: 'Completion Date', width: 150, editable: true },
        { field: 'status', headerName: 'Status', width: 150, editable: false },
        {
            field: "toggleStatus",
            headerName: "Toggle Status",
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    onClick={() => handleToggleStatus(params.row, params.row.status)}
                    className={`w-full text-white px-4 py-2 text-xs font-semibold rounded-md ${
                        params.row.status === "Under study" ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                    {params.row.status === "Under study" ? "Approve" : "Revert to Study"}
                </Button>
            ),
        },
    ];

    const handleToggleStatus = (row: Opportunity, currentStatus: string) => {
        const updatedStatus = currentStatus === "Under study" ? "Approved" : "Under study";
        setDataRows((prevRows) =>
            prevRows.map((r) => (r.id === row.id ? { ...r, status: updatedStatus as Opportunity['status'] } : r))
        );
    };

    const handleEditOption = (params: { field: string; row: Opportunity }) => {
        if (['update', 'toggleStatus', 'status', "__check__"].includes(params.field)) return;

        Swal.fire({
            text: "Do you want to edit this line? Press 'Cancel' to go to the opportunity page.",
            showCancelButton: true
        }).then(r => {
            if (r.isDismissed) navigate(`/opportunityDetails/${params.row.id}`);
        });
    };

    const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
        if (oldRow.status === "Approved") {
            return oldRow;
        }
        return newRow;
    };

    if (isLoading) return <TableSkeleton rows={4} columns={7} />
    if (isError) return <ErrorComponent message="An error occurred while fetching the information. Contact technical support and show them this code: Error loading opportunities." />

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
                '& .under-study-row': {
                    backgroundColor: '#e2f7e2',
                    '&:hover': {
                        backgroundColor: '#b1f1b1',
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
                getRowClassName={(params) => params.row.status === "Under study" ? 'under-study-row' : ''}
                processRowUpdate={processRowUpdate}
            />
        </Box>
    );
}

export default OpportunityTable;