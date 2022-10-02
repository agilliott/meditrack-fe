import { Grid } from '@mui/material';
import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";

import NavBar from './components/NavBar';
import ErrorPage from "./pages/ErrorPage";
import Tracker from './pages/Tracker'

function App() {

  return (
    <Grid container>
      <Grid item xs={12}>
        <Routes>
          <Route index element={<Tracker />} />
          <Route path="tracker" element={<Tracker />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Grid>
      <Grid item xs={!2}>
        <NavBar />
      </Grid>
    </Grid>
  )
}

export default App
