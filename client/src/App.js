import { useSelector } from 'react-redux';
// import './App.css';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
// import HomePage from 'scenes/homePage/index';
// import LoginPage from 'scenes/loginPage';
// import ProfilePage from 'scenes/profilePage';
import { themeSettings } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import { useMemo } from 'react';
import React from 'react';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              {/* <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} /> */}
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
