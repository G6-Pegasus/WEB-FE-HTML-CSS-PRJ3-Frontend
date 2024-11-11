// hook import
import { useState } from 'react';
import { useGetOpportunityFollowUps } from '../../hooks/useGetOpportunityFollowUps';
import { Opportunity, FollowUp } from '../../utils/types'

// function imports
import { formatDate, handleViewAllButtonClickTS, handleSort, sortArray, paginateArray, getPages, handlePreviousPage, handleNextPage } from '../../utils/functions';
import { differenceInMonths } from 'date-fns';
import TableSkeleton from '../common/TableSkeleton';
import ErrorComponent from '../common/ErrorComponent';

interface OpportunityFollowUpTableProps {
    opportunity: Opportunity;
}

const OpportunityFollowUpTable = ({ opportunity }: OpportunityFollowUpTableProps) => {
    // hook implementation
    const [currentTablePage, setcurrentTablePage] = useState(1);
    const [rowsPerTablePage, setRowsPerTablePage] = useState(5);
    const [viewAllButton, setViewAllButton] = useState(false);
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

    // this will get the sub-array followUpSteps from the given opportunity
    const { data: opportunityFollowUps, error, isLoading } = useGetOpportunityFollowUps(opportunity.id)

    // conditional rendering
    if (isLoading) return <TableSkeleton rows={4} columns={6} />
    if (error) return <ErrorComponent message={`An error occurred while fetching the information. Contact technical support and show them this code: ${error.message}.`} />

    // button view all / view less void implementation
    const handleViewAllButtonClick = (
        sortedOpportunityFollowUpSteps: FollowUp[], 
        viewAllButton: boolean, 
        setRowsPerTablePage: React.Dispatch<React.SetStateAction<number>>, 
        setcurrentTablePage: React.Dispatch<React.SetStateAction<number>>, 
        setViewAllButton: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        handleViewAllButtonClickTS(sortedOpportunityFollowUpSteps, viewAllButton, setRowsPerTablePage, setcurrentTablePage, setViewAllButton);
    };
    
    const sortedOpportunityFollowUpSteps: FollowUp[] = sortArray(opportunityFollowUps || [], sortConfig);
    const totalPages: number = getPages(sortedOpportunityFollowUpSteps, rowsPerTablePage);
    const currentRows: FollowUp[] = paginateArray(sortedOpportunityFollowUpSteps, rowsPerTablePage, currentTablePage);
    
    return (
        <div className="w-full max-h-96">
            <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
                <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                    <div className="flex items-center justify-between ">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">Follow-up Tasks for</h3>
                            <p className="text-slate-500">{opportunity.businessName}</p>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
                            <button
                            className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button" onClick={() => handleViewAllButtonClick(sortedOpportunityFollowUpSteps, viewAllButton, setRowsPerTablePage, setcurrentTablePage, setViewAllButton)} disabled={sortedOpportunityFollowUpSteps.length <= rowsPerTablePage && !viewAllButton}>
                                {viewAllButton ? 'View Less' : 'View All'}
                            </button>
                            <button
                            className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" stroke-width="2" className="w-4 h-4">
                                    <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Add Follow-Up Task
                            </button>
                        </div>
                    </div>                
                </div>
                <div className="p-0 max-w-full overflow-y-auto max-h-96">
                    <table className="w-full mt-4 text-left table-auto min-w-max">
                        <thead className="sticky top-0 bg-white bg-opacity-100 z-10">
                            <tr>
                                <th
                                    className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100 w-48" onClick={() => handleSort('description', sortConfig, setSortConfig)}>
                                    <p
                                    className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                        Description {sortConfig?.key === 'description' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>                        
                                <th
                                    className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100 w-48" onClick={() => handleSort('commercialExecutive', sortConfig, setSortConfig)}>
                                    <p
                                    className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                    Commercial Executive {sortConfig?.key === 'commercialExecutive' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>
                                <th
                                    className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100 w-40" onClick={() => handleSort('status', sortConfig, setSortConfig)}>
                                    <p
                                    className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                    Status {sortConfig?.key === 'status' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>
                                <th
                                    className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100 w-40" onClick={() => handleSort('contactDate', sortConfig, setSortConfig)}>
                                    <p
                                    className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500 max-w-xs break-words">
                                    Contact Date {sortConfig?.key === 'contactDate' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>
                                <th
                                    className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100 w-40" onClick={() => handleSort('contactType', sortConfig, setSortConfig)}>
                                    <p
                                    className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500 max-w-xs break-words">
                                    Contact Type {sortConfig?.key === 'contactType' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>                              
                                <th
                                    className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100 w-40">                        
                                </th>                                                               
                            </tr>
                        </thead>                        
                        <tbody>
                            {currentRows?.map((followUpStep, index) => {
                                const followUpStepDeadline = new Date(followUpStep.contactDate)
                                const currentDate = new Date()
                                const monthsDifference = differenceInMonths(followUpStepDeadline, currentDate)

                                const dateClass = monthsDifference <= 3 ? 'text-red-900 bg-red-500/20' : monthsDifference <= 6 ? 'text-yellow-900 bg-yellow-500/20' : 'text-green-900 bg-green-500/20';                                
                                return (
                                    <tr key={index}>
                                        <td className="p-4 border-b border-slate-200 w-40 break-words">
                                            <div className="flex flex-col">
                                                <p className="text-sm font-semibold text-slate-700">
                                                    {followUpStep.description}
                                                </p>                                                
                                            </div>
                                        </td>
                                        <td className="p-4 border-b border-slate-200 w-40 break-words">
                                            <div className="flex flex-col">
                                                <p className="text-sm text-slate-500">
                                                    {followUpStep.commercialExecutive}
                                                </p>
                                            </div>
                                        </td>                                
                                        <td className="p-4 border-b border-slate-200 w-40 break-words">
                                            <div className={`border-b border-slate-200 relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${
                                            followUpStep.status === 'Done' ? 'text-green-900 bg-green-500/20' :
                                            followUpStep.status === 'In Review' ? 'text-blue-900 bg-blue-500/20' :
                                            followUpStep.status === 'In Progress' ? 'text-purple-900 bg-purple-500/20' :
                                            followUpStep.status === 'Pending' ? 'text-yellow-900 bg-yellow-500/20' :
                                            ''}`}>
                                                {followUpStep.status}
                                            </div>                                    
                                        </td>
                                        <td className="p-4 border-b border-slate-200">                                        
                                            <div className={`border-b border-slate-200 relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${dateClass}`}>
                                                {formatDate(followUpStep.contactDate)}
                                            </div>
                                        </td>
                                        <td className="p-4 border-b border-slate-200 w-40 break-words">
                                            <div className={`border-b border-slate-200 relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${
                                            followUpStep.contactType === 'call' ? 'text-green-900 bg-green-500/20' :
                                            followUpStep.contactType === "email" ? 'text-blue-900 bg-blue-500/20' :
                                            followUpStep.contactType === 'meeting' ? 'text-purple-900 bg-purple-500/20' :
                                            ''}`}>
                                                {followUpStep.contactType}
                                            </div>                                    
                                        </td>
                                        <td className="p-4 border-b border-slate-200">                                            
                                            <button
                                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                                    className="w-4 h-4">
                                                        <path
                                                            d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </button>
                                            <button
                                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M6 18L18 18M6 6L18 6M9 6L9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4L15 6M10 11L10 17M14 11L14 17">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </button>
                                        </td>                                    
                                    </tr>
                                )
                            })}
                        </tbody>                        
                    </table>
                </div>
                <div className="flex items-center justify-between p-3">
                    <p className="block text-sm text-slate-500">
                        Page {currentTablePage} of {totalPages}
                    </p>
                    <div className="flex gap-1">
                        <button
                        className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => handlePreviousPage(currentTablePage, setcurrentTablePage)}
                        disabled={currentTablePage === 1 || viewAllButton}>
                            Previous
                        </button>
                        <button
                        className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => handleNextPage(currentTablePage, setcurrentTablePage)}
                        disabled={currentTablePage === totalPages || viewAllButton}>
                            Next
                        </button>
                    </div>
                </div>
            </div>              
        </div>
    );
}

export default OpportunityFollowUpTable;