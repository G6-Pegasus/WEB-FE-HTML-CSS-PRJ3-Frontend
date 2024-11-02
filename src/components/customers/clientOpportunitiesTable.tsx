import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { opportunity } from '../../utils/types'
import { format, differenceInMonths } from 'date-fns'

export default function clientOpportunitiesTable() {
    const { data: opportunities, error, isLoading } = useQuery<opportunity[], Error>({
        queryKey: ['opportunities'],
        queryFn: async () => {
          const response = await fetch('http://localhost:3001/opportunities')
          if (!response.ok) throw new Error('An error occurred while fetching the information. The server has rejected the connection.')
          return response.json() as Promise<opportunity[]>
        }
    });

    if (isLoading) return <div>Loading content, please be patient...</div>
    if (error) return <div>An error occurred while fetching the information. Contact technical support and show them this code: {error.message}.</div>

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [viewAll, setViewAll] = useState(false);

    const handleViewAllClick = () => {
        if (viewAll) {
            setRowsPerPage(5);
        } else {
            setRowsPerPage(opportunitiesClient.length);
            setCurrentPage(1);
        }
        setViewAll(!viewAll);
    };
 
    const opportunitiesClient = opportunities.filter(opportunity => opportunity.client === "Inversiones Globales S.A.");

    const totalPages = Math.ceil((opportunitiesClient?.length || 0) / rowsPerPage);    
    const currentRows = opportunitiesClient?.slice(
        (currentPage - 1) * rowsPerPage, 
        Math.min(currentPage * rowsPerPage, opportunities.length)
    );

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="mx-auto max-h-96">
            <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
                <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                    <div className="flex items-center justify-between ">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">Opportunities for</h3>
                            <p className="text-slate-500">[current client]</p>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
                            <button
                            className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button" onClick={handleViewAllClick}>
                                {viewAll ? 'View Less' : 'View All'}
                            </button>
                            <button
                            className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                    stroke-width="2" className="w-4 h-4">
                                    <path
                                    d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z">
                                    </path>
                                </svg>
                                Add Opportunity
                            </button>
                        </div>
                    </div>                
                </div>
                <div className="p-0 max-w-full overflow-y-auto max-h-96">
                    <table className="w-full mt-4 text-left table-auto min-w-max">
                        <thead className="sticky top-0 bg-white bg-opacity-100 z-10">
                            <tr>
                                <th
                                    className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100 w-48">
                                    <p
                                    className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                    Task
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>                        
                                <th
                                    className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100 w-48">
                                    <p
                                    className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                    Description
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>
                                <th
                                    className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100 w-40">
                                    <p
                                    className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                    Status
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>
                                <th
                                    className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100 w-40">
                                    <p
                                    className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500 max-w-xs break-words">
                                    Estimated Closing Date
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>
                                <th
                                    className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100 w-40">
                                    <p
                                    className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                    Estimated Cost
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
                            {currentRows?.filter(opportunity => opportunity.client === "Inversiones Globales S.A.").map(opportunity => {
                                const estimatedCompletionDate = new Date(opportunity.estimatedCompletionDate)
                                const currentDate = new Date()
                                const monthsDifference = differenceInMonths(estimatedCompletionDate, currentDate)

                                const dateClass = monthsDifference <= 3 ? 'text-red-900 bg-red-500/20' : monthsDifference <= 6 ? 'text-yellow-900 bg-yellow-500/20' : 'text-green-900 bg-green-500/20';                                
                                return (
                                    <tr key={opportunity.id}>
                                        <td className="p-4 border-b border-slate-200 w-40 break-words">
                                            <div className="flex flex-col">
                                                <p className="text-sm font-semibold text-slate-700">
                                                    {opportunity.businessName}
                                                </p>
                                                <p className="text-sm text-slate-500">
                                                    {opportunity.businessLine}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="p-4 border-b border-slate-200 w-40 break-words">
                                            <div className="flex flex-col">
                                                <p className="text-sm text-slate-500">
                                                    {opportunity.opportunityDescription}
                                                </p>
                                            </div>
                                        </td>                                
                                        <td className="p-4 border-b border-slate-200 w-40 break-words">
                                            <div className={`border-b border-slate-200 relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${
                                            opportunity.status === 'Executed' ? 'text-green-900 bg-green-500/20' :
                                            opportunity.status === 'Under Study' ? 'text-blue-900 bg-blue-500/20' :
                                            opportunity.status === 'Purchase Order' ? 'text-purple-900 bg-purple-500/20' :
                                            opportunity.status === 'Opening' ? 'text-yellow-900 bg-yellow-500/20' :
                                            ''}`}>
                                                {opportunity.status}
                                            </div>                                    
                                        </td>
                                        <td className="p-4 border-b border-slate-200">                                        
                                            <div className={`border-b border-slate-200 relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${dateClass}`}>
                                                {format(estimatedCompletionDate, 'dd/MM/yyyy')}
                                            </div>
                                        </td>
                                        <td className="p-4 border-b border-slate-200 text-right text-green-500 font-bold">
                                            {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'COP' }).format(opportunity.estimatedValue)}
                                        </td>                                        
                                        <td className="p-4 border-b border-slate-200">
                                        <button
                                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                                    className="w-4 h-4">
                                                        <path
                                                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.83 0-1.5-.67-1.5-1.5S11.17 14 12 14s1.5.67 1.5 1.5S12.83 17 12 17zm1-4h-2V7h2v6z">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </button> 
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
                        Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex gap-1">
                        <button
                        className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1 || viewAll}>
                            Previous
                        </button>
                        <button
                        className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages || viewAll}>
                            Next
                        </button>
                    </div>
                </div>
            </div>        
        </div>
    );
}