import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { AdminPanelState } from 'toolkitStore/types';
import { blockCurrentUser, fetchAllUsers } from 'toolkitStore/thunk';
import { IUserParams } from 'types/interfaces';

import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight, FirstPage, LastPage } from '@mui/icons-material';

import userImg from 'assets/userPhoto.png';

import './styles.scss';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

export const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { users } = useSelector((state: AdminPanelState) => state.adminPanelReducer || []);
  const dispatch = useDispatch();

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBlockUser = (user: IUserParams) => {
    dispatch(
      blockCurrentUser({
        params: {
          id: user.id,
          blocked: !user.blocked,
        },
      }),
    );
    dispatch(fetchAllUsers());
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return (
    <>
      <h1>Users</h1>
      <TableContainer className="table" component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 160 }} align="center">
                Photo
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                Name
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                Last name
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                Email
              </TableCell>
              <TableCell style={{ width: 80 }} align="center">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : users
            ).map((user) => (
              <TableRow key={user.id}>
                <TableCell style={{ width: 160 }} align="center">
                  <img
                    className="users__photo"
                    width={50}
                    src={user.photo ? user.photo : userImg}
                  />
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {user.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {user.lastName}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {user.email}
                </TableCell>
                <TableCell style={{ width: 80 }} align="center">
                  <p
                    onClick={() => handleBlockUser(user)}
                    className={classNames('users__status', {
                      'users__status--active': !user.blocked,
                      'users__status--blocked': user.blocked,
                    })}
                  >
                    {user.blocked ? 'Blocked' : 'Active'}
                  </p>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'games per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};
