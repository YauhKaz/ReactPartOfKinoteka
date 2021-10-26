import * as React from 'react';
import { createContext, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { colors } from '../components/Color';

const LayoutContext = createContext({
  mode: '',
  toggle: () => {},
  theme: {},
});

export function LayoutContextProvider(props) {
  const [userMode, setUserMode] = useState('light');
  const [layoutTheme, setLayoutTheme] = useState(
    createTheme({
      palette: {
        info: {
          main: `${colors.background}`,
        },
        secondary: {
          main: `${colors.background}`,
          dark: `${colors.primaryDarker}`,
          light: `${colors.primaryLighter}`,
          contrastText: `${colors.primaryBase}`,
        },
        primary: {
          main: `${colors.primaryBase}`,
          dark: `${colors.primaryDarker}`,
          light: `${colors.primaryLighter}`,
          contrastText: `${colors.background}`,
        },
        background: {
          paper: `${colors.background}`,
          default: `${colors.background}`,
        },
      },
    }),
  );

  function toggleThemes(userMode) {
    userMode === 'light' ? setUserMode('dark') : setUserMode('light');
    userMode !== 'light'
      ? setLayoutTheme(
          createTheme({
            type: 'light',
            palette: {
              primary: {
                main: `${colors.primaryBase}`,
                dark: `${colors.primaryDarker}`,
                light: `${colors.primaryLighter}`,
                contrastText: `${colors.background}`,
              },
              background: {
                paper: `${colors.background}`,
              },
            },
          }),
        )
      : setLayoutTheme(createTheme());
  }

  const context = {
    mode: userMode,
    toggle: toggleThemes,
    theme: layoutTheme,
  };

  return (
    <LayoutContext.Provider value={context}>
      {props.children}
    </LayoutContext.Provider>
  );
}

export default LayoutContext;
