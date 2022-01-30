import '../styles/main.scss'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux'
import { store } from '../redux';
import { SnackbarProvider } from 'notistack';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';

// import 'react-phone-input-2/dist/style.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}


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

export default function App(props: MyAppProps) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  let persistor = persistStore(store);

  return (
<CacheProvider value={emotionCache}>
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
     </CacheProvider>
    
  )
  
 
}
