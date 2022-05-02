import React, { useCallback, useState } from 'react';

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
import { IOrder } from 'types/interfaces';
import { fetchOrders } from 'api/fetchOrders';

enum orderOptions {
  NEWEST_ORDERS = 'Newest orders',
  OLDEST_ORDERS = 'Oldest orders',
  drawerWidth = 240,
}

interface IParams {
  order?: string;
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: orderOptions.drawerWidth,
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
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [params, setParams] = useState<IParams>({ order: 'Newest' });
  const [orderParams, setOrderParams] = useState('');

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const getOrders = useCallback(async (params: IParams) => {
    try {
      const { data } = await fetchOrders({ params });
      setOrders(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

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

  React.useEffect(() => {
    setIsLoading(true);
    getOrders(params);
    setIsLoading(false);
  }, [getOrders, params]);

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
            <ListItem button key="New game">
              <ListItemIcon>
                <FiberNewIcon />
              </ListItemIcon>
              <ListItemText primary="New game" />
            </ListItem>
            <ListItem button key="New author">
              <ListItemIcon>
                <FiberNewIcon />
              </ListItemIcon>
              <ListItemText primary="New author" />
            </ListItem>
            <ListItem button key="Discounts">
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
                </Paper>
              </Grid>
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
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
