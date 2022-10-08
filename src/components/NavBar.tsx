import { NavLink, useLocation } from 'react-router-dom';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  CalendarMonth,
  InsertChartOutlined,
  MedicationOutlined,
} from '@mui/icons-material';

import { routeKeyMap } from '../routing/routes';

const NavBar = () => {
  const { pathname } = useLocation();
  const route = pathname.replace('/', '');

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels value={routeKeyMap[route]}>
        <BottomNavigationAction
          component={NavLink}
          to="/tracker"
          label="Tracker"
          icon={<CalendarMonth />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/analyse"
          label="Analyse"
          icon={<InsertChartOutlined />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/medication"
          label="Medication"
          icon={<MedicationOutlined />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default NavBar;
