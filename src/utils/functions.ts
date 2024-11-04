import { format } from 'date-fns'

// this function is used to format the date in the format dd/MM/yyyy
export const formatDate = (date: Date | string) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {            
        return 'Fecha inválida';
    }
    return format(parsedDate, 'dd/MM/yyyy');
};

// this void is used to handle the view all button click event
export const handleViewAllButtonClickTS = (array: any[], viewAllButton: boolean, setRowsPerTablePage: (rows: number) => void, setcurrentTablePage: (page: number) => void, setViewAllButton: (viewAll: boolean) => void) => {
    if (viewAllButton) {
        setRowsPerTablePage(5);
    } else {
        setRowsPerTablePage(array.length);
        setcurrentTablePage(1);
    }
    setViewAllButton(!viewAllButton);
};

// this void is used to define the sort order to sort the table by the key passed as parameter
export const handleSort = (
    key: string, 
    sortConfig: { key: string, direction: 'asc' | 'desc' } | null, 
    setSortConfig: (config: { key: string, direction: 'asc' | 'desc' }) => void
): void => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
    }
    setSortConfig({ key, direction });
};

// this function is used to sort the array by the key and direction passed as parameters
export const sortArray = (array: any[], sortConfig: { key: string, direction: 'asc' | 'desc' } | null) => {
    if (!sortConfig) {
        return array;
    }
    return array.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });
}

// this function returns the array paginated
export const paginateArray = (array: any[], rowsPerPage: number, currentPage: number) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return array.slice(startIndex, endIndex);
}

// this function returns the number of pages based on the array length and the rows per page
export const getPages = (array: any[], rowsPerPage: number) => {
    return Math.ceil(array.length / rowsPerPage);
}

// this function is used to handle the previous page button click event
export const handlePreviousPage = (currentPage: number, setCurrentPage: (page: number) => void) => {
    setCurrentPage(currentPage - 1);
}

// this function is used to handle the next page button click event
export const handleNextPage = (currentPage: number, setCurrentPage: (page: number) => void) => {
    setCurrentPage(currentPage + 1);
}