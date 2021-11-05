import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MainListItems from '../components/listItems';
import LayoutContext from '../store/layout-context';
import styled, { ThemeProvider } from 'styled-components';
import Table from './Table';
import NewItem from './NewItem';
import { Route, Switch } from 'react-router-dom';
import { Api } from '../API/ApiClient';

const drawerWidth = 240;

const TypographyComponent = styled(Typography)(
  ({ theme }) => `
  color: ${theme.palette.background.paper};
  `,
);

const BoxComponent = styled(Box)(
  ({ theme }) => `
    background: ${theme.palette.background.paper};
  `,
);

const ListComponent = styled(List)(
  ({ theme }) => `
    background: ${theme.palette.primary.main};
    color: ${theme.palette.background.paper};
  `,
);

const IconButtonComponent = styled(IconButton)(
  ({ theme }) => `
  & svg {color: ${theme.palette.background.paper}};
  `,
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& div': {
    background: `${theme.palette.primary.main}`,
    color: `${theme.palette.background.paper}`,
  },
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& div': {
    background: `${theme.palette.primary.main}`,
    color: `${theme.palette.background.paper}`,
  },
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
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
}));

function DashboardContent() {
  const layoutContext = useContext(LayoutContext);
  const { theme } = layoutContext;
  function toggleTheme() {
    layoutContext.toggle(layoutContext.mode);
  }

  const history = useHistory();

  const URL = process.env.REACT_APP_URL;

  const [open, setOpen] = useState(true);
  const [data, setData] = useState([]);
  const [nameOfTable, setNameOfTable] = useState('Movies');
  const [columns, setColumns] = useState([]);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    loadingData('movies');
  }, []);

  const loadingTable = (e) => {
    const urlEnd = e.target.outerText.toLowerCase();
    setNameOfTable(e.target.outerText);
    loadingData(urlEnd);
  };

  const loadingData = (urlEnd) => {
    new Api().loadAllItems(`${URL}/${urlEnd}`).then((result) => {
      let columnsArray = [];
      for (let key in result[0]) {
        if (key !== 'images' && key !== 'actors' && key !== 'categories') {
          columnsArray.push({ title: `${key}`, field: `${key}` });
        }
      }
      setColumns(columnsArray);
      setData(result);
      history.push(`/${urlEnd}`);
    });
  };

  const deleteRow = (id) => {
    const url = `${URL}/${nameOfTable}/${id}`;
    new Api().deleteItem(url).then((response) => {
      if (response.ok) loadingData(`${nameOfTable.toLowerCase()}`);
    });
  };

  const loadNew = () => {
    history.push(`/${nameOfTable.toLowerCase()}/new`);
  };

  const loadEdit = (id) => {
    history.push(`/${nameOfTable.toLowerCase()}/${id}`);
  };

  const loadRow = (tempNewItem) => {
    const url = `${URL}/actors/`;
    new Api().loadNewActor(url, tempNewItem).then((response) => {
      if (response.ok) {
        loadingData(`${nameOfTable.toLowerCase()}`);
        history.push('/actors');
      } else {
        alert('You are not admin');
      }
    });
  };

  const editRow = (id, tempNewItem) => {
    const url = `${URL}/actors/` + id;
    new Api().loadUpdateActor(url, id, tempNewItem).then((response) => {
      if (response.ok) {
        loadingData(`${nameOfTable.toLowerCase()}`);
        history.push('/actors');
      } else {
        alert('You are not admin');
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButtonComponent
              edge="start"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButtonComponent>
            <TypographyComponent
              component="h1"
              variant="h6"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Kinoteka
            </TypographyComponent>
            <IconButtonComponent onClick={toggleTheme}>
              <Badge badgeContent={1} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButtonComponent>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButtonComponent onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButtonComponent>
          </Toolbar>
          <Divider />
          <ListComponent
            color="secondary"
            onClick={loadingTable}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              '& div': {
                display: 'grid',
                '& div': {
                  display: 'flex',
                  flexDirection: 'row',
                  padding: '10px',
                  color: `${theme.palette.background.paper}`,
                },
              },
            }}
          >
            <MainListItems />
          </ListComponent>
          <Divider />
        </Drawer>
        <BoxComponent
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Table */}
            <Switch>
              <Route path={`/${nameOfTable.toLowerCase()}`} exact>
                <Table
                  column={columns}
                  data={data}
                  nameOfTable={nameOfTable}
                  deleteRow={deleteRow}
                  loadNew={loadNew}
                  loadEdit={loadEdit}
                />
              </Route>
              <Route path={`/${nameOfTable.toLowerCase()}/new`}>
                <NewItem loadRow={loadRow} />
              </Route>
              <Route path={`/${nameOfTable.toLowerCase()}/:id`}>
                <NewItem editRow={editRow} />
              </Route>
              <Route>
                <>
                  <CircularProgress color="success" />
                </>
              </Route>
            </Switch>
          </Container>
        </BoxComponent>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
