import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#404040',
    color: theme.palette.common.white,
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '150px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables({ Data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMouseEnter = (event, content) => {
    event.target.title = content;
  };

  const handleMouseLeave = (event) => {
    event.target.title = '';
  };

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, (Data?.length || 0) - page * rowsPerPage);

  const columns = Object.keys(Data?.[0] || {});

  return (
    <TableContainer component={Paper} sx={{ marginTop: 10 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column}>{column}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? Data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : Data
          )?.map((row) => (
            <StyledTableRow key={row._id}>
              {columns.map((column) => (
                <StyledTableCell
                  key={column}
                  onMouseEnter={(event) => handleMouseEnter(event, row[column])}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row[column]?.length > 15
                      ? row[column].substring(0, 15) + '...'
                      : row[column]}
                  </div>
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
{/* 
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={columns.length} />
            </TableRow>
          )} */}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[ 10]}
        component="div"
        count={Data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
