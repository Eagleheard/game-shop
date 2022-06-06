import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Discount,
  GamesTable,
  Loader,
  NewAuthor,
  NewGame,
  Orders,
  SignUp,
  Users,
  ToastComponent,
} from 'components';
import { OrdersReducerState } from 'toolkitStore/types';
import { fetchAllOrders } from 'toolkitStore/thunk';
import { IOrderParams } from 'types/interfaces';
import { useAuth } from 'hooks/useAuth';
import { userOptions, ToastOptions } from 'types/enumerators';
import { useToast } from 'hooks';

import MuiDrawer from '@mui/material/Drawer';
import {
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Container,
  IconButton,
  Divider,
  Toolbar,
  Box,
  CssBaseline,
} from '@mui/material';

import ListAltIcon from '@mui/icons-material/ListAlt';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

enum orderOptions {
  NEWEST_ORDERS = 'Newest orders',
  OLDEST_ORDERS = 'Oldest orders',
}

enum pageOptions {
  ORDERS = 'Orders',
  ALL_GAMES = 'All games',
  NEW_GAME = 'New game',
  UPDATE_GAME = 'Update game',
  NEW_AUTHOR = 'New author',
  USERS = 'Users',
  DISCOUNT = 'Discount',
  SIGN_UP = 'Sign up',
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: '240px',
      height: '103vh',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

export const AdminPanel = () => {
  const [open, setOpen] = useState(true);
  const [params, setParams] = useState<IOrderParams>({ order: 'Newest' });
  const [orderParams, setOrderParams] = useState('');
  const { user } = useAuth();
  const [isNewGameVisible, setIsNewGameVisible] = useState(false);
  const [isUpdateGameVisible, setIsUpdateGameVisible] = useState(false);
  const [isNewAuthorVisible, setIsNewAuthorVisible] = useState(false);
  const [isOrdersVisible, setIsOrdersVisible] = useState(true);
  const [isDiscountsVisible, setIsDiscountsVisible] = useState(false);
  const [isGamesVisible, setIsGamesVisible] = useState(false);
  const [isUsersVisible, setIsUsersVisible] = useState(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const dispatch = useDispatch();
  const { orders, isLoading, ordersError } = useSelector(
    (state: OrdersReducerState) => state.ordersReducer || [],
  );

  const { openToast } = useToast();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSelect = (event: SelectChangeEvent) => {
    setOrderParams(event.target.value as string);
    switch (orderParams) {
      case orderOptions.NEWEST_ORDERS:
        setParams({ order: 'Newest' });
        break;
      case orderOptions.OLDEST_ORDERS:
        setParams({ order: 'Oldest' });
        break;
      default:
        setParams({});
    }
  };

  const handleOpen = (page: string) => {
    if (page === pageOptions.ALL_GAMES) {
      setIsNewGameVisible(false);
      setIsNewAuthorVisible(false);
      setIsOrdersVisible(false);
      setIsGamesVisible(true);
      setIsUpdateGameVisible(false);
      setIsUsersVisible(false);
      setIsSignUpVisible(false);
      setIsDiscountsVisible(false);
    }
    if (page === pageOptions.ORDERS) {
      dispatch(fetchAllOrders({ params }));
      setIsNewGameVisible(false);
      setIsNewAuthorVisible(false);
      setIsOrdersVisible(true);
      setIsGamesVisible(false);
      setIsUpdateGameVisible(false);
      setIsUsersVisible(false);
      setIsSignUpVisible(false);
      setIsDiscountsVisible(false);
    }
    if (page === pageOptions.USERS) {
      setIsUsersVisible(true);
      setIsNewGameVisible(false);
      setIsNewAuthorVisible(false);
      setIsOrdersVisible(false);
      setIsGamesVisible(false);
      setIsUpdateGameVisible(false);
      setIsSignUpVisible(false);
      setIsDiscountsVisible(false);
    }
    if (page === pageOptions.NEW_GAME) {
      setIsNewGameVisible(true);
      setIsNewAuthorVisible(false);
      setIsOrdersVisible(false);
      setIsGamesVisible(false);
      setIsUpdateGameVisible(false);
      setIsUsersVisible(false);
      setIsSignUpVisible(false);
      setIsDiscountsVisible(false);
    }
    if (page === pageOptions.UPDATE_GAME) {
      setIsNewGameVisible(false);
      setIsNewAuthorVisible(false);
      setIsOrdersVisible(false);
      setIsGamesVisible(false);
      setIsUpdateGameVisible(true);
      setIsUsersVisible(false);
      setIsSignUpVisible(false);
      setIsDiscountsVisible(false);
    }
    if (page === pageOptions.NEW_AUTHOR) {
      setIsNewGameVisible(false);
      setIsNewAuthorVisible(true);
      setIsOrdersVisible(false);
      setIsGamesVisible(false);
      setIsUpdateGameVisible(false);
      setIsUsersVisible(false);
      setIsSignUpVisible(false);
      setIsDiscountsVisible(false);
    }
    if (page === pageOptions.DISCOUNT) {
      setIsNewGameVisible(false);
      setIsNewAuthorVisible(false);
      setIsOrdersVisible(false);
      setIsGamesVisible(false);
      setIsUpdateGameVisible(false);
      setIsUsersVisible(false);
      setIsDiscountsVisible(true);
      setIsSignUpVisible(false);
    }
    if (page === pageOptions.SIGN_UP) {
      setIsNewGameVisible(false);
      setIsNewAuthorVisible(false);
      setIsOrdersVisible(false);
      setIsGamesVisible(false);
      setIsUpdateGameVisible(false);
      setIsUsersVisible(false);
      setIsDiscountsVisible(false);
      setIsSignUpVisible(true);
    }
  };

  useEffect(() => {
    dispatch(fetchAllOrders({ params }));
    if (ordersError && !isLoading) {
      openToast(ordersError, ToastOptions.error);
    }
  }, [params]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <ListItem button key="Orders" onClick={() => handleOpen(pageOptions.ORDERS)}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            {user?.role === userOptions.ADMIN && (
              <ListItem button key="Users" onClick={() => handleOpen(pageOptions.USERS)}>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            )}
            <ListItem button key="All games" onClick={() => handleOpen(pageOptions.ALL_GAMES)}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="All games" />
            </ListItem>
            <ListItem button key="New game" onClick={() => handleOpen(pageOptions.NEW_GAME)}>
              <ListItemIcon>
                <FiberNewIcon />
              </ListItemIcon>
              <ListItemText primary="New game" />
            </ListItem>
            <ListItem button key="New author" onClick={() => handleOpen(pageOptions.NEW_AUTHOR)}>
              <ListItemIcon>
                <FiberNewIcon />
              </ListItemIcon>
              <ListItemText primary="New author" />
            </ListItem>
            <ListItem button key="Discounts" onClick={() => handleOpen(pageOptions.DISCOUNT)}>
              <ListItemIcon>
                <LocalOfferIcon />
              </ListItemIcon>
              <ListItemText primary="Discounts" />
            </ListItem>
            {user?.role === userOptions.ADMIN && (
              <ListItem button key="Create manager" onClick={() => handleOpen(pageOptions.SIGN_UP)}>
                <ListItemIcon>
                  <PersonAddAltIcon />
                </ListItemIcon>
                <ListItemText primary="Create manager" />
              </ListItem>
            )}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '105vh',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                    height: '100vh',
                  }}
                >
                  {isOrdersVisible && (
                    <>
                      <FormControl
                        sx={{
                          mb: '20px',
                          width: '100%',
                          alignSelf: 'center',
                        }}
                      >
                        <InputLabel id="demo-simple-select-label">Orders</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={orderParams}
                          label="Orders"
                          onChange={handleSelect}
                        >
                          <MenuItem value={orderOptions.NEWEST_ORDERS}>Newest</MenuItem>
                          <MenuItem value={orderOptions.OLDEST_ORDERS}>Oldest</MenuItem>
                        </Select>
                      </FormControl>
                      {orders && !isLoading ? (
                        <TableContainer component={Paper}>
                          <Table aria-label="collapsible table">
                            <TableHead>
                              <TableRow>
                                <TableCell />
                                <TableCell>Game</TableCell>
                                <TableCell align="right">Image</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Author</TableCell>
                                <TableCell align="right">Genre</TableCell>
                                <TableCell align="right">Type</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {orders.map((order) => (
                                <Orders key={order.id} {...order} />
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <Loader />
                      )}
                    </>
                  )}
                  {isNewGameVisible && (
                    <NewGame
                      createMode="New game"
                      handleOpenNewAuthor={() => handleOpen(pageOptions.NEW_GAME)}
                    />
                  )}
                  {isNewAuthorVisible && <NewAuthor />}
                  {isUpdateGameVisible && (
                    <NewGame
                      createMode="Update game"
                      isEditMode
                      handleOpenNewAuthor={() => handleOpen(pageOptions.UPDATE_GAME)}
                    />
                  )}
                  {isGamesVisible && (
                    <GamesTable handleOpenNewGame={() => handleOpen(pageOptions.UPDATE_GAME)} />
                  )}
                  {isUsersVisible && <Users />}
                  {isDiscountsVisible && <Discount />}
                  {isSignUpVisible && user.role === userOptions.ADMIN && (
                    <SignUp handleSwitch={() => setIsSignUpVisible(false)} />
                  )}
                </Paper>
              </Grid>
              {isOrdersVisible && (
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100vh',
                    }}
                  ></Paper>
                </Grid>
              )}
            </Grid>
          </Container>
        </Box>
      </Box>
      <ToastComponent />
    </ThemeProvider>
  );
};
