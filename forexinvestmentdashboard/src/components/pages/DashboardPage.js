import React, { Fragment } from 'react';

import AdminCardSection1 from './sections/AdminCardSection1';
import AdminCardSection2 from './sections/AdminCardSection2';
import BreadcrumSection from './sections/BreadcrumSection';
import ChartSection1 from './sections/ChartSection1';
import ChartSection2 from './sections/ChartSection2';
import { MDBRow } from 'mdbreact';
import MapSection from './sections/MapSection';
import ModalSection from './sections/ModalSection';
import TableSection from './sections/TableSection';

const DashboardPage = props => {
  const { sessions, accountConfiguration } = props;
  const date = new Date();
  date.setDate(date.getDate() - date.getDay());
  date.setHours(0, 0, 0, 0);
  const thisSundaysDate = new Date(date);

  const monthBeginDate = new Date(date.getFullYear(), date.getMonth(), 1);

  const thisWeeksSessions = sessions.filter(session => {
    const SessionDate = new Date(session.dateTime);
    return SessionDate >= thisSundaysDate;
  });
  const thisMonthsSessions = sessions.filter(session => {
    const SessionDate = new Date(session.dateTime);
    return SessionDate >= monthBeginDate;
  });
  return (
    <Fragment>
      {/* <BreadcrumSection /> */}
      <AdminCardSection1
        thisWeeksSessions={thisWeeksSessions}
        thisMonthsSessions={thisMonthsSessions}
      />
      <ChartSection1
        thisWeeksSessions={thisWeeksSessions}
        thisMonthsSessions={thisMonthsSessions}
      />
      {/* <TableSection /> */}
      <ChartSection2
        sessions={sessions}
        thisWeeksSessions={thisWeeksSessions}
        thisMonthsSessions={thisMonthsSessions}
        accountConfiguration={accountConfiguration}
      />
      {/* <MDBRow className="mb-4">
        <MapSection />
        <ModalSection />
      </MDBRow>
      <AdminCardSection2 /> */}
    </Fragment>
  );
};

export default DashboardPage;
