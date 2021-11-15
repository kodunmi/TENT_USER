import '../styles/main.scss'
import { AppProps } from 'next/app'
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo } from 'react';
import { Provider } from 'react-redux'
import { store } from '../redux';
import { SnackbarProvider } from 'notistack';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// import 'react-phone-input-2/dist/style.css'

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');


  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          neutral: {
            main: prefersDarkMode? '#EACA1F' : '#161616',
            contrastText: prefersDarkMode? '#161616' : '#EACA1F',
          },
        },
      }),
    [prefersDarkMode],
  );
  
  let persistor = persistStore(store);

  return (
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
     </ThemeProvider>
     </PersistGate>
    </Provider>
    </SnackbarProvider>
    
    
  )
  
 
}
