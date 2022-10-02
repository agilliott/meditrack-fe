import * as React from 'react';
import { NavLink } from "react-router-dom";
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';

const NavBar = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction component={NavLink} to="/tracker" label="Tracker" icon={<CalendarMonthIcon />} />
        <BottomNavigationAction component={NavLink} to="/analysis" label="Analysis" icon={<InsertChartOutlinedIcon />} />
        <BottomNavigationAction component={NavLink} to="/medication" label="Medication" icon={<MedicationOutlinedIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default NavBar;
