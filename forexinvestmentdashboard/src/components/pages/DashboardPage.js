import AdminCardSection1 from './sections/AdminCardSection1';
import AdminCardSection2 from './sections/AdminCardSection2';
import BreadcrumSection from './sections/BreadcrumSection';
import ChartSection1 from './sections/ChartSection1';
import ChartSection2 from './sections/ChartSection2';
import { MDBRow } from 'mdbreact';
import MapSection from './sections/MapSection';
import ModalSection from './sections/ModalSection';
import React from 'react';
import TableSection from './sections/TableSection';

const DashboardPage = props => {
  const { sessions } = props;
  return (
    <React.Fragment>
      {/* <BreadcrumSection /> */}
      <AdminCardSection1 />
      <ChartSection1 sessions={sessions} />
      <TableSection />
      <ChartSection2 />
      <MDBRow className="mb-4">
        <MapSection />
        <ModalSection />
      </MDBRow>
      <AdminCardSection2 />
    </React.Fragment>
  );
};

export default DashboardPage;
