import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Contact } from '../../utils/types';

interface CustomerContactsTableProps {
  contacts: Contact[];
}

const CustomerContactsTable = ({ contacts }: CustomerContactsTableProps) => {
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [rowsPerTablePage, setRowsPerTablePage] = useState(5);
  const [viewAllButton, setViewAllButton] = useState(false);

  // Paginación
  const totalPages = Math.ceil(contacts.length / rowsPerTablePage);
  const currentRows = contacts.slice(
    (currentTablePage - 1) * rowsPerTablePage,
    currentTablePage * rowsPerTablePage
  );

  const handleViewAllButtonClick = () => {
    setViewAllButton(!viewAllButton);
    setRowsPerTablePage(viewAllButton ? 5 : contacts.length);
    setCurrentTablePage(1);
  };

  const handlePreviousPage = () => {
    if (currentTablePage > 1) setCurrentTablePage(currentTablePage - 1);
  };

  const handleNextPage = () => {
    if (currentTablePage < totalPages) setCurrentTablePage(currentTablePage + 1);
  };

  return (
    <div className="w-full max-h-50 overflow-hidden">
      <div className="relative flex flex-col w-full h-auto text-slate-700 bg-white shadow-md rounded-xl">
        <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Contacts</h3>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                onClick={handleViewAllButtonClick}
                disabled={contacts.length <= rowsPerTablePage && !viewAllButton}
                className="border border-slate-300 text-slate-600 px-3 py-2 text-xs font-semibold hover:bg-slate-100"
              >
                {viewAllButton ? 'View Less' : 'View All'}
              </Button>
            </div>
          </div>
        </div>
        <TableContainer component={Paper} className="p-0 max-w-full overflow-y-auto shadow-none">
          <Table className="w-full mt-4 table-auto">
            <TableHead className="sticky top-0 bg-slate-50 z-10">
              <TableRow>
                <TableCell className="p-4 font-semibold text-slate-700 border-b border-slate-200">Name</TableCell>
                <TableCell className="p-4 font-semibold text-slate-700 border-b border-slate-200">Email</TableCell>
                <TableCell className="p-4 font-semibold text-slate-700 border-b border-slate-200">Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((contact, index) => (
                <TableRow key={index} className="hover:bg-slate-100">
                  <TableCell className="p-4 text-slate-700 border-b border-slate-200">{contact.Cname}</TableCell>
                  <TableCell className="p-4 text-slate-500 border-b border-slate-200">{contact.Cemail}</TableCell>
                  <TableCell className="p-4 text-slate-500 border-b border-slate-200">{contact.Cphone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex items-center justify-between p-3">
          <p className="text-sm text-slate-500">
            Page {currentTablePage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              onClick={handlePreviousPage}
              disabled={currentTablePage === 1 || viewAllButton}
              className="border border-slate-300 text-slate-600 px-3 py-2 text-xs font-semibold hover:bg-slate-100"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={currentTablePage === totalPages || viewAllButton}
              className="border border-slate-300 text-slate-600 px-3 py-2 text-xs font-semibold hover:bg-slate-100"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerContactsTable;