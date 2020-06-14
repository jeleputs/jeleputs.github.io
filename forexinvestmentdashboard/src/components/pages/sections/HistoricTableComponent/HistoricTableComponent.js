import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

import React from 'react';

const HistoricTablesComponent = props => {
  const { sessions, setSessionEditing } = props;
  return (
    <MDBTable>
      <MDBTableHead color="primary-color" textWhite>
        <tr>
          <th>Id</th>
          <th>Date</th>
          <th>Facilitator</th>
          <th>Ttl. before</th>
          <th>Ttl. after</th>
          <th>%</th>
          <th>Rat.</th>
          <th>edit</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {sessions[0].id
          ? sessions
              .sort((a, b) => (a.id < b.id ? 1 : -1))
              .map(session => {
                const percentaje = (
                  (session.finalAmount / session.initialAmount - 1) *
                  100
                ).toFixed(2);
                return (
                  <tr key={session.id}>
                    <td>{session.id}</td>
                    <td>{session.dateTime}</td>
                    <td>{session.facilitator}</td>
                    <td align="right">{`$${session.initialAmount.toFixed(
                      2
                    )}`}</td>
                    <td align="right">{`$${session.finalAmount.toFixed(
                      2
                    )}`}</td>
                    <td>
                      {percentaje < 0 ? (
                        <span className="badge danger-color badge-danger-color badge-pill ">
                          {percentaje}%<i className="fa fa-arrow-down ml-1"></i>
                        </span>
                      ) : (
                        <span className="badge success-color badge-success-color badge-pill ">
                          {percentaje}%<i className="fa fa-arrow-up ml-1"></i>
                        </span>
                      )}
                    </td>
                    <td>
                      {session.transactions
                        .reduce(
                          (prev, curr) =>
                            curr.isWon === true
                              ? [parseInt(prev[0]) + 1, prev[1]]
                              : [prev[0], parseInt(prev[1]) + 1],
                          [0, 0]
                        )
                        .join('/')}
                    </td>
                    <td>
                      <MDBBtn
                        size="sm"
                        gradient="blue"
                        onClick={() => {
                          setSessionEditing(session.id);
                        }}>
                        Edit
                      </MDBBtn>
                    </td>
                  </tr>
                );
              })
          : null}
      </MDBTableBody>
    </MDBTable>
  );
};

export default HistoricTablesComponent;
