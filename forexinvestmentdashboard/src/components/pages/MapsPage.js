import { MDBCard, MDBCardBody, MDBCol, MDBRow, MDBView } from 'mdbreact';
import React, { Fragment } from 'react';

const MapsPage = props => {
  const { sessions } = props;
  return (
    <Fragment>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard className="mt-5">
            <MDBView className="gradient-card-header blue darken-2">
              <h4 className="h4-responsive text-white">Sessions</h4>
            </MDBView>
            <MDBCardBody className="text-left">
              <pre>{JSON.stringify(sessions)}</pre>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </Fragment>
  );
};

export default MapsPage;
