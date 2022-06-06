import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
} from '@mui/material';

import { Edit, Delete, Clear } from '@mui/icons-material';

import { addNewGameRequest } from 'toolkitStore/actions/games';
import { ToastOptions } from 'types/enumerators';
import { IGame } from 'types/interfaces';
import { Portal } from 'components/Portal';
import { deleteGame } from 'api/adminRequests';
import { fetchGames } from 'api/fetchGames';
import { useToast } from 'hooks';
import {
  Autocomplete,
  ConfirmDialog,
  Loader,
  ToastComponent,
  TablePaginationButtons,
} from 'components';

import './styles.scss';

interface IGamesTable {
  handleOpenNewGame: () => void;
}

export const GamesTable: React.FC<IGamesTable> = ({ handleOpenNewGame }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [games, setGames] = useState<IGame[]>([]);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const dispatch = useDispatch();
  const { openToast } = useToast();

  const fillGames = async () => {
    try {
      const { data } = await fetchGames();
      setGames(data.rows);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), ToastOptions.error);
    }
  };

  const handleDeleteGame = async (id: number) => {
    try {
      await deleteGame(id);
      const { data } = await fetchGames();
      setGames(data.rows);
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
    fillGames();
  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - games.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectGame = (input: string) => {
    const selectedGame = games.filter(({ name }) => name === input);
    setGames(selectedGame);
    setPage(0);
  };

  const handleEditGame = (game: IGame) => {
    dispatch(addNewGameRequest(game));
    handleOpenNewGame();
  };

  return (
    <>
      <h1>All games</h1>
      {games.length !== 0 ? (
        <TableContainer className="table" component={Paper}>
          <Clear className="table__close-btn" onClick={fillGames} />
          <Autocomplete
            options={games.map(({ name }) => name)}
            name="Game"
            onChangeInput={handleSelectGame}
          />
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 160 }} align="center">
                  Name
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  Author
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  Genre
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  Price
                </TableCell>
                <TableCell style={{ width: 40 }} align="center">
                  Edit
                </TableCell>
                <TableCell style={{ width: 40 }} align="center">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? games.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : games
              ).map((game) => (
                <TableRow key={game.id}>
                  <TableCell style={{ width: 160 }} align="center">
                    {game.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {game.author.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {game.genre.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {game.price}$
                  </TableCell>
                  <TableCell className="table__cell" style={{ width: 40 }} align="center">
                    <Edit className="table__cell--icon" onClick={() => handleEditGame(game)} />
                  </TableCell>
                  <TableCell className="table__cell" style={{ width: 40 }} align="center">
                    <Delete
                      className="table__cell--icon"
                      onClick={() => setIsConfirmVisible(true)}
                    />
                  </TableCell>
                  {isConfirmVisible && (
                    <Portal
                      Component={() => (
                        <ConfirmDialog
                          confirmDeleting={() => handleDeleteGame(game.id)}
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
                  count={games.length}
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
        </TableContainer>
      ) : (
        <Loader />
      )}
      <ToastComponent />
    </>
  );
};
