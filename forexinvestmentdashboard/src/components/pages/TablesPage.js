import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBRow } from 'mdbreact';
import React, { useEffect, useState } from 'react';

import { AddSessionComponent } from './sections/AddSessionComponent';
import { AddSessionDetailsComponent } from './sections/AddSessionDetailsComponent';
import { HistoricTableComponent } from './sections/HistoricTableComponent';

const TablesPage = props => {
  const { sessions, setSessions, accountConfiguration, catalogues } = props;
  const [creatingNewSession, setCreatingNewSession] = useState(false);
  const [creatingBankTransaction, setCreatingBankTransaction] = useState(false);
  const [sessionEditing, setSessionEditing] = useState(0);

  useEffect(() => {
    if (creatingNewSession === true) {
      if (creatingBankTransaction === false) {
        setSessionEditing(
          sessions
            .map(session => session.id)
            .reduce((prev, curr) => (prev < curr ? curr : prev), 0)
        );
      }
      setCreatingNewSession(false);
      setCreatingBankTransaction(false);
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
            {creatingNewSession === false ? (
              <MDBBtn
                onClick={() => {
                  setCreatingNewSession(true);
                  setCreatingBankTransaction(true);
                }}>
                Add new Bank transfer
              </MDBBtn>
            ) : null}

            {creatingNewSession === true ? (
              <AddSessionComponent
                sessions={sessions}
                setSessions={setSessions}
                setSessionEditing={setSessionEditing}
                accountConfiguration={accountConfiguration}
                creatingBankTransaction={creatingBankTransaction}
              />
            ) : null}

            {sessionEditing > 0 ? (
              <AddSessionDetailsComponent
                sessions={sessions}
                setSessions={setSessions}
                sessionEditing={sessionEditing}
                accountConfiguration={accountConfiguration}
                catalogues={catalogues}
              />
            ) : null}

            <HistoricTableComponent
              sessions={sessions}
              setSessionEditing={setSessionEditing}
            />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default TablesPage;
