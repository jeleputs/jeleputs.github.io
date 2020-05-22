import { Route, Switch } from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';
import MapsPage from './pages/MapsPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import React from 'react';
import TablesPage from './pages/TablesPage';

const Routes = props => {
  return (
    <Switch>
      <Route path="/" exact render={() => <DashboardPage {...props} />} />
      <Route path="/dashboard" render={() => <DashboardPage {...props} />} />
      <Route path="/profile" render={() => <ProfilePage {...props} />} />
      <Route path="/tables" render={() => <TablesPage {...props} />} />
      <Route path="/maps" render={() => <MapsPage {...props} />} />
      <Route path="/404" render={() => <NotFoundPage {...props} />} />
    </Switch>
  );
};

export default Routes;
