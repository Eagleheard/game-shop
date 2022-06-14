import React, { useEffect, useState } from 'react';
import { Delete } from '@mui/icons-material';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { useToast } from 'hooks';
import { DiscountsReducerState } from 'toolkitStore/types';
import { ConfirmDialog, Portal, TablePaginationButtons, Loader } from 'components';
import { ToastOptions } from 'types/enumerators';
import { deleteDiscount } from 'api/adminRequests';
import { fetchAllDiscounts } from 'toolkitStore/thunk';

export const DiscountsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [deletedDiscountId, setDeletedDiscountId] = useState(0);
  const { openToast } = useToast();

  const { discount, isLoading, discountError } = useSelector(
    (state: DiscountsReducerState) => state.discountsReducer || [],
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - discount.length ?? 1) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenConfirm = (id: number) => {
    setIsConfirmVisible(true);
    setDeletedDiscountId(id);
  };

  const handleDeleteDiscount = async (id: number) => {
    try {
      await deleteDiscount(id);
      dispatch(fetchAllDiscounts());
      setIsConfirmVisible(false);
      openToast('Successfully deleted', ToastOptions.success);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), ToastOptions.error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllDiscounts());
    if (discountError && !isLoading) {
      openToast(discountError, ToastOptions.error);
    }
  }, []);

  return (
    <TableContainer className="table" component={Paper}>
      {discount && !isLoading ? (
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 160 }} align="center">
                Name
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                Discount
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                Data of start discount
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                Data of end discount
              </TableCell>
              <TableCell style={{ width: 40 }} align="center">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? discount.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : discount
            ).map((item) => (
              <TableRow key={item.id}>
                <TableCell style={{ width: 160 }} align="center">
                  {item.gameName}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {item.discountCount}%
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {item.formatedStartDiscount}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {item.formatedEndDiscount}
                </TableCell>
                <TableCell className="table__cell" style={{ width: 40 }} align="center">
                  <Delete
                    className="table__cell--icon"
                    onClick={() => handleOpenConfirm(item.id)}
                  />
                </TableCell>
                {isConfirmVisible && (
                  <Portal
                    Component={() => (
                      <ConfirmDialog
                        confirmDeleting={() => handleDeleteDiscount(deletedDiscountId)}
                        handleClose={() => setIsConfirmVisible(false)}
                      />
                    )}
                    isOpen={isConfirmVisible}
                    text="Delete selected game?"
                    handleClose={() => setIsConfirmVisible(false)}
                  />
                )}
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
                count={discount.length}
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
                ActionsComponent={TablePaginationButtons}
              />
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <Loader />
      )}
    </TableContainer>
  );
};
