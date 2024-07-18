import { useState, useEffect, useContext, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Entry from './entry';
import { sort } from 'fast-sort';
// import { TableContext } from '../context/create';
import Navbar from './navbar';
import Pagination from './pagination';
import { data } from './data';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export function createData(Id, Name, Role, Years, Salary) {
  return { Id, Name, Role, Years, Salary };
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

let PageSize = 5;

export default function CustomizedTables() {
  const [rows, setRows] = useState(data);
  const [nrows, setNrows] = useState(data);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [sortval, setSortval] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  // var [currentTableData,setCurrentTableData] = useState();

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return rows.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, rows]);

  // const { sortval } = useContext(TableContext);

  useEffect(() => {
    const demo = rows.filter((item) =>
      item.Name.includes(search) || item.Role.includes(search)
    )
    setRows(demo);
  }, [search]);

  useEffect(() => {
    var sorted = sort(rows).asc(sortval);
    setRows(sorted);
  }, [sortval]);

  const handleClick = () => {
    setOpen(!open);
  }

  const handleClose = () => {
    setOpen(!open);
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = currentTableData.map((row) => row.Id);
      setSelectedRows(newSelecteds);
      return;
    }
    setSelectedRows([]);
  };

  const handleSelectRow = (event, rowId) => {
    const selectedIndex = selectedRows.indexOf(rowId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, rowId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1),
      );
    }

    setSelectedRows(newSelected);
  };

  const isSelected = (rowId) => selectedRows.indexOf(rowId) !== -1;

  return (
    <div>
      <Navbar rows={rows} setRows={setRows} setSearch={setSearch} sortval={sortval} setSortval={setSortval} />

      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                    checked={rows.length > 0 && selectedRows.length === rows.length}
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all rows' }}
                  />
                </StyledTableCell>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Role</StyledTableCell>
                <StyledTableCell align="right">Years</StyledTableCell>
                <StyledTableCell align="right">Salary</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentTableData.map((row) => {
                const isItemSelected = isSelected(row.Id);
                return (
                  <StyledTableRow
                    hover
                    onClick={(event) => handleSelectRow(event, row.Id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row?.Id}
                    selected={isItemSelected}
                  >
                    <StyledTableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': `enhanced-table-checkbox-${row.Id}` }}
                        onClick={(event) => handleSelectRow(event, row.Id)}
                      />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row?.Id}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row?.Name}</StyledTableCell>
                    <StyledTableCell align="right">{row?.Role}</StyledTableCell>
                    <StyledTableCell align="right">{row?.Years}</StyledTableCell>
                    <StyledTableCell align="right">{row?.Salary}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={rows.length}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Entry rows={rows} setRows={setRows} createData={createData} setOpen={setOpen} nrows={nrows} setNrows={setNrows} />
        </Box>
      </Modal>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-evenly" }}>
        <Button variant="contained" onClick={handleClick}> Add Employee</Button>
        <Button disabled={selectedRows.length === 0}
          onClick={() => {
            const remainingRows = rows.filter(row => !selectedRows.includes(row.Id));
            setRows(remainingRows);
            setNrows(remainingRows);
            setSelectedRows([]);
          }} variant="contained">Delete Employee</Button>
      </div>
    </div>
  );
}
