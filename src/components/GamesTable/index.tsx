import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { IGame } from 'types/interfaces';
import { fetchGames } from 'api/fetchGames';
import { TableHead } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Autocomplete, Confirm } from 'components';
import ClearIcon from '@mui/icons-material/Clear';

import './styles.scss';
import { useDispatch } from 'react-redux';
import { addNewGameRequest } from 'toolkitStore/slices';
import { Portal } from 'components/Portal';
import { deleteGame } from 'api/adminRequests';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

interface IGamesTable {
  handleOpenNewGame: () => void;
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
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
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
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export const GamesTable: React.FC<IGamesTable> = ({ handleOpenNewGame }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [games, setGames] = useState<IGame[]>([]);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const dispatch = useDispatch();

  const fillGames = async () => {
    try {
      const { data } = await fetchGames();
      setGames(data.rows);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteGame = async (id: number) => {
    try {
      await deleteGame(id);
      const { data } = await fetchGames();
      setGames(data.rows);
      setIsConfirmVisible(false);
    } catch (e) {
      console.log(e);
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
      <TableContainer className="table" component={Paper}>
        <ClearIcon className="table__close-btn" onClick={fillGames} />
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
                  <EditIcon className="table__cell--icon" onClick={() => handleEditGame(game)} />
                </TableCell>
                <TableCell style={{ width: 40 }} align="center">
                  <DeleteIcon onClick={() => setIsConfirmVisible(true)} />
                </TableCell>
                {isConfirmVisible && (
                  <Portal
                    Component={() => (
                      <Confirm
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
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};
