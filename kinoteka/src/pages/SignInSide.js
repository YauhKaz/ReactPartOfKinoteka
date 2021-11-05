import * as React from 'react';
import { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LayoutContext from '../store/layout-context';
import AuthContext from '../store/auth-context';
import { useHistory } from 'react-router-dom';
import { Api } from '../API/ApiClient';
import styled, { ThemeProvider } from 'styled-components';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        My Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const CheckboxComponent = styled(Checkbox)(
  ({ theme }) => `
    background: ${theme.palette.background.paper};
    & svg {color: ${theme.palette.primary.main}};
  `,
);

const AvatarComponent = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.palette.primary.main};
    & svg {color: ${theme.palette.background.paper}};
  `,
);

const TypographyComponent = styled(Typography)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};
  `,
);

const ButtonComponent = styled(Button)(
  ({ theme }) => `
  background: ${theme.palette.primary.main};
  color: ${theme.palette.background.paper};
  :hover {
    background: ${theme.palette.primary.light};
  }
  `,
);

const GridComponent = styled(Grid)(
  ({ theme }) => `
    background: ${theme.palette.background.paper};
  `,
);

const LinkConponent = styled(Link)(
  ({ theme }) => `
    color: ${theme.palette.primary.main};
  `,
);

const FormControlLabelConponent = styled(FormControlLabel)(
  ({ theme }) => `
    color: ${theme.palette.primary.main};
  `,
);

const TextFieldComponent = styled(TextField)(
  ({ theme }) => `
    color: ${theme.palette.primary.main};
    & .Mui-focused {
      color: ${theme.palette.primary.main};
    }
    & label {
      color:  ${theme.palette.primary.main};
      opacity: .8;
    }
    & div {
      color: ${theme.palette.primary.main};
      & .Mui-focused {
        color: ${theme.palette.primary.main};
        border-color: ${theme.palette.primary.main};
      }
      & fieldset {
        color: ${theme.palette.primary.main};
        border-color: ${theme.palette.primary.main} !important;
      }
    }
  `,
);

export default function SignInSide() {
  const layoutContext = useContext(LayoutContext);
  const history = useHistory();
  const { theme } = layoutContext;
  const { isAdmin, setIsAdmin } = useContext(AuthContext);

  function toggleTheme() {
    layoutContext.toggle(layoutContext.mode);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      username: data.get('username'),
      password: data.get('password'),
    };
    new Api().load(userData).then((response) => {
      if (response.ok && userData.username === 'admin') {
        setIsAdmin(true);
        console.log(isAdmin);
        history.push('/movie');
      } else {
        history.push('/');
        alert('you have not access');
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          height: '100vh',
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://upload.wikimedia.org/wikipedia/commons/2/2f/Sala_de_cine.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <GridComponent
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <AvatarComponent sx={{ m: 1 }}>
              <LockOutlinedIcon />
            </AvatarComponent>
            <TypographyComponent component="h1" variant="h5">
              Sign in
            </TypographyComponent>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextFieldComponent
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextFieldComponent
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabelConponent
                control={<CheckboxComponent value="remember" />}
                label="Remember me"
              />
              <ButtonComponent
                onClick={toggleTheme}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </ButtonComponent>
              <Grid container>
                <Grid item xs>
                  <LinkConponent href="#" variant="body2">
                    Forgot password?
                  </LinkConponent>
                </Grid>
                <Grid item>
                  <LinkConponent href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </LinkConponent>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </GridComponent>
      </Grid>
    </ThemeProvider>
  );
}
