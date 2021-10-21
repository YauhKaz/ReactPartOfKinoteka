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
            background: `${colors.primaryBase}`,
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            background: `${colors.primaryBase}`,
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
  }));

  function toggleThemes(userMode) {
    userMode === "light" ? setUserMode("dark") : setUserMode("light");
    userMode !== "light" ? 
      setLayoutTheme(createTheme(
        {
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
            MuiButton: {
              styleOverrides: {
                root: {
                  color: `${colors.primaryBase}`,
                }
              }
            }
          }
        }
      ))
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