import { MDBBtn } from 'mdbreact';
import React from 'react';

const AddSessionComponent = props => {
  const { sessions, setSessions, accountConfiguration } = props;
  const lastSessionId = sessions[0].id
    ? sessions
        .map(session => session.id)
        .reduce((prev, curr) => (prev < curr ? curr : prev), 0)
    : 0;
  const initialAmount = sessions[0].id
    ? sessions.filter(session => session.id === lastSessionId)[0].finalAmount
    : accountConfiguration.initialAmount;
  const suggestedLot = initialAmount * accountConfiguration.suggestedLotSizes;
  const now = new Date();
  const date = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${(now.getDate() + 1).toString().padStart(2, '0')}`;
  const time = `${now.getHours()}:${now.getMinutes()}`;
  const dateTime = `${date} ${time}:00`;
  const newSession = {
    id: lastSessionId + 1,
    dateTime,
    facilitator: 'Ric',
    initialAmount,
    finalAmount: initialAmount,
    suggestedLot,
    transactions: [],
  };

  const addSessionHandler = () => {
    const filteredSession =
      sessions.length >= 1 ? sessions.filter(session => session.id) : sessions;
    setSessions([...filteredSession, newSession]);
  };

  return (
    <div>
      ADDING A NEW SESSION
      <MDBBtn onClick={addSessionHandler}>Save Session</MDBBtn>
    </div>
  );
};

export default AddSessionComponent;
