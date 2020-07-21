import React, { Fragment } from 'react';

import AdminCardSection1 from './sections/AdminCardSection1';
import ChartSection1 from './sections/ChartSection1';

const DashboardPage = props => {
  const { sessions, accountConfiguration, catalogues } = props;
  const date = new Date();
  date.setDate(date.getDate() - date.getDay());
  date.setHours(0, 0, 0, 0);
  const thisSundaysDate = new Date(date);
  const monthBeginDate = new Date(date.getFullYear(), date.getMonth(), 1);

  const fiveWeeksAgo = new Date();
  fiveWeeksAgo.setDate(fiveWeeksAgo.getDate() - fiveWeeksAgo.getDay() - 28);

  const thisWeeksSessions = sessions.filter(session => {
    const SessionDate = new Date(session.dateTime);
    return SessionDate >= thisSundaysDate;
  });

  const thisMonthsSessions = sessions.filter(session => {
    const SessionDate = new Date(session.dateTime);
    return SessionDate >= monthBeginDate;
  });

  const lastFiveWeeksSessions = sessions.filter(session => {
    const SessionDate = new Date(session.dateTime);
    return SessionDate >= fiveWeeksAgo;
  });

  return (
    <Fragment>
      {/* <BreadcrumSection /> */}
      <AdminCardSection1
        thisWeeksSessions={thisWeeksSessions}
        thisMonthsSessions={thisMonthsSessions}
        accountConfiguration={accountConfiguration}
      />
      <ChartSection1
        thisWeeksSessions={thisWeeksSessions}
        lastFiveWeeksSessions={lastFiveWeeksSessions}
        catalogues={catalogues}
      />
    </Fragment>
  );
};

export default DashboardPage;
