import { createContext, useState } from "react"
import { createTheme } from '@mui/material/styles';
import { colors } from '../components/Color';

const LayoutContext = createContext({
  mode: "",
  toggle: (userMode) => {},
  theme: {},
});

export function LayoutContextProvider(props) {
  const [userMode, setUserMode]= useState("light");
  const [layoutTheme, setLayoutTheme] = useState(createTheme(
    {
      palette: {
        info: {
          main: `${colors.background}`,
        },
        secondary: {
          main: `${colors.background}`,
          dark: `${colors.primaryDarker}`,
          light: `${colors.primaryLighter}`,
          contrastText: `${colors.primaryBase}`
        },
        primary: {
          main: `${colors.primaryBase}`,
          dark: `${colors.primaryDarker}`,
          light: `${colors.primaryLighter}`,
          contrastText: `${colors.background}`
        },
        background: {
          paper: `${colors.background}`,
          default: `${colors.background}`,
        }
    },
  }));

  function toggleThemes(userMode) {
    userMode === "light" ? setUserMode("dark") : setUserMode("light");
    userMode !== "light" ? 
      setLayoutTheme(createTheme(
        {
          type: 'light',
          palette: {
            primary: {
              main: `${colors.primaryBase}`,
              dark: `${colors.primaryDarker}`,
              light: `${colors.primaryLighter}`,
              contrastText: `${colors.background}`
            },
            background: {
              paper: `${colors.background}`
            }
        },
        components: {
          MuiIconButton: {
            styleOverrides: {
              root: {
                background: `${colors.primaryBase}`,
              }
            }
          },
          MuiSvgIcon: {
            styleOverrides: {
              root: {
                color: `${colors.background}`,
              }
            }
          },
          MuiDrawer: {
            styleOverrides: {
              root: {
                color: `${colors.primaryBase}`,
              }
            }
          },
          MuiButtonBase: {
            styleOverrides: {
              root: {
                color: `${colors.background}`,
                background: `${colors.primaryBase}`,
              }
            }
          },
          MuiCheckbox: {
            styleOverrides: {
              root: {
                color: `${colors.primaryBase}`,
                background: `${colors.background}`,
                "& MuiSvgIcon": {
                  background: `${colors.primaryBase}`,
                }
              }
            }
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                background: `${colors.background}`,
              }
            }
          },
          MuiContainer: {
            styleOverrides: {
              root: {
                background: `${colors.background}`,
              }
            }
          },
          MuiList: {
            styleOverrides: {
              root: {
                background: `${colors.primaryBase}`,
              }
            }
          },
          MuiToolbar: {
            styleOverrides: {
              root: {
                background: `${colors.primaryBase}`,
              }
            }
          }
        }
      }))
    : setLayoutTheme(createTheme())
  }

  const context = {
    mode: userMode,
    toggle: toggleThemes,
    theme: layoutTheme,
  }
  
  return <LayoutContext.Provider value={context}>
    {props.children}
  </LayoutContext.Provider>
}

export default LayoutContext;