import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBRow } from 'mdbreact';
import React, { useEffect, useState } from 'react';

import { AddSessionComponent } from './sections/AddSessionComponent';
import { HistoricTableComponent } from './sections/HistoricTableComponent';

const TablesPage = props => {
  const { sessions, setSessions, accountConfiguration } = props;
  const [creatingNewSession, setCreatingNewSession] = useState(false);
  const [sessionEditing, setSessionEditing] = useState(0);

  useEffect(() => {
    if (creatingNewSession === true) {
      setSessionEditing(
        sessions
          .map(session => session.id)
          .reduce((prev, curr) => (prev < curr ? curr : prev), 0)
      );
      setCreatingNewSession(false);
    }
  }, [sessions]);
  return (
    <MDBRow>
      <MDBCol md="12">
        <MDBCard className="mt-5">
          <MDBCardBody>
            {creatingNewSession === false ? (
              <MDBBtn onClick={() => setCreatingNewSession(true)}>
                Add new Session
              </MDBBtn>
            ) : null}

            {creatingNewSession === true ? (
              <AddSessionComponent
                sessions={sessions}
                setSessions={setSessions}
                setSessionEditing={setSessionEditing}
                accountConfiguration={accountConfiguration}
              />
            ) : null}

            {sessionEditing > 0 ? (
              <div>Editing the session {sessionEditing}</div>
            ) : // <AddSessionDetailsComponent
            //   sessionData={sessions.filter(
            //     session => session.id === sessionEditing
            //   )[0]}
            //   setSessionEditing={setSessionEditing}
            //   accountConfiguration={accountConfiguration}
            // />
            null}

            <HistoricTableComponent sessions={sessions} />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default TablesPage;
