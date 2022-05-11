import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListAltIcon from '@mui/icons-material/ListAlt';
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
} from '@mui/material';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Card } from 'screen';
import { Discount, GamesTable, NewAuthor, NewGame, Portal } from 'components';
import { AdminPanelState } from 'toolkitStore/types';
import { addNewGame, fetchAllOrders } from 'toolkitStore/thunk';
import { IOrderParams } from 'types/interfaces';

enum orderOptions {
  NEWEST_ORDERS = 'Newest orders',
  OLDEST_ORDERS = 'Oldest orders',
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
  const [isNewGameVisible, setIsNewGameVisible] = useState(false);
  const [isUpdateGameVisible, setIsUpdateGameVisible] = useState(false);
  const [isNewAuthorVisible, setIsNewAuthorVisible] = useState(false);
  const [isOrdersVisible, setIsOrdersVisible] = useState(true);
  const [isDiscountsVisible, setIsDiscountsVisible] = useState(false);
  const [isGamesVisible, setIsGamesVisible] = useState(false);
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector(
    (state: AdminPanelState) => state.adminPanelReducer || [],
  );

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

  const handleOpenOrders = () => {
    setIsNewGameVisible(false);
    setIsNewAuthorVisible(false);
    setIsOrdersVisible(true);
    setIsGamesVisible(false);
    setIsUpdateGameVisible(false);
  };

  const handleOpenNewGame = () => {
    setIsNewGameVisible(true);
    setIsNewAuthorVisible(false);
    setIsOrdersVisible(false);
    setIsGamesVisible(false);
    setIsUpdateGameVisible(false);
  };

  const handleOpenUpdateGame = () => {
    setIsNewGameVisible(false);
    setIsNewAuthorVisible(false);
    setIsOrdersVisible(false);
    setIsGamesVisible(false);
    setIsUpdateGameVisible(true);
  };

  const handleOpenNewAuthor = () => {
    setIsNewGameVisible(false);
    setIsNewAuthorVisible(true);
    setIsOrdersVisible(false);
    setIsGamesVisible(false);
    setIsUpdateGameVisible(false);
  };

  const handleOpenGames = () => {
    setIsNewGameVisible(false);
    setIsNewAuthorVisible(false);
    setIsOrdersVisible(false);
    setIsGamesVisible(true);
    setIsUpdateGameVisible(false);
  };

  useEffect(() => {
    dispatch(fetchAllOrders({ params }));
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
            <ListItem button key="Orders" onClick={handleOpenOrders}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button key="All games" onClick={handleOpenGames}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="All games" />
            </ListItem>
            <ListItem button key="New game" onClick={handleOpenNewGame}>
              <ListItemIcon>
                <FiberNewIcon />
              </ListItemIcon>
              <ListItemText primary="New game" />
            </ListItem>
            <ListItem button key="New author" onClick={handleOpenNewAuthor}>
              <ListItemIcon>
                <FiberNewIcon />
              </ListItemIcon>
              <ListItemText primary="New author" />
            </ListItem>
            <ListItem button key="Discounts" onClick={() => setIsDiscountsVisible(true)}>
              <ListItemIcon>
                <LocalOfferIcon />
              </ListItemIcon>
              <ListItemText primary="Discounts" />
            </ListItem>
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
                          width: '90%',
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
                        orders.map(({ id, game, formatedCreatedAt, quantity }) => (
                          <Card
                            order
                            key={id}
                            purchaseDate={formatedCreatedAt}
                            quantity={quantity}
                            {...game}
                          />
                        ))
                      ) : (
                        <p>Loading</p>
                      )}
                    </>
                  )}
                  {isNewGameVisible && (
                    <NewGame label="New game" handleOpenNewAuthor={handleOpenNewAuthor} />
                  )}
                  {isNewAuthorVisible && <NewAuthor />}
                  {isUpdateGameVisible && (
                    <NewGame label="Update game" handleOpenNewAuthor={handleOpenNewAuthor} />
                  )}
                  {isGamesVisible && <GamesTable handleOpenNewGame={handleOpenUpdateGame} />}
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
          {isDiscountsVisible && (
            <Portal
              Component={() => <Discount />}
              isOpen={isDiscountsVisible}
              text="Discounts"
              handleClose={() => setIsDiscountsVisible(false)}
            />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
