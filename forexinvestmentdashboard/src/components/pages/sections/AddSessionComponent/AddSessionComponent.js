import { MDBBtn, MDBInput } from 'mdbreact';
import React, { useState } from 'react';

const AddSessionComponent = props => {
  const {
    sessions,
    setSessions,
    accountConfiguration,
    creatingBankTransaction,
  } = props;

  const lastSessionId = sessions[0].id
    ? sessions
        .map(session => session.id)
        .reduce((prev, curr) => (prev < curr ? curr : prev), 0)
    : 0;
  const initialAmount = sessions[0].id
    ? Math.round(
        sessions.filter(session => session.id === lastSessionId)[0]
          .finalAmount * 100
      ) / 100
    : Math.round(accountConfiguration.initialAmount * 100) / 100;

  const suggestedLot =
    Math.round(initialAmount * accountConfiguration.suggestedLotSizes * 100) /
    100;

  const now = new Date();
  const date = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${now
    .getDate()
    .toString()
    .padStart(2, '0')}`;
  const time = `${now.getHours()}:${now.getMinutes()}`;
  const dateTime = `${date} ${time}:00`;

  const [newSession, setNewSession] = useState({
    id: lastSessionId + 1,
    isDeposit: creatingBankTransaction,
    dateTime,
    facilitator: creatingBankTransaction === true ? 'Bank Transaction' : 'Ric',
    initialAmount,
    finalAmount: initialAmount,
    suggestedLot,
    transactions: [],
  });

  const addSessionHandler = () => {
    const filteredSession =
      sessions.length >= 1 ? sessions.filter(session => session.id) : sessions;
    setSessions([
      ...filteredSession,
      {
        ...newSession,
        initialAmount: parseFloat(newSession.initialAmount) || 0,
        suggestedLot: parseFloat(newSession.suggestedLot) || 0,
        finalAmount: parseFloat(newSession.finalAmount) || 0,
      },
    ]);
  };

  const handlerUpdate = e => {
    setNewSession({ ...newSession, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-group">
      <MDBInput label="Session Number" value={newSession.id} />
      <MDBInput
        name="initialAmount"
        label="Initial Amount"
        value={newSession.initialAmount}
        onChange={handlerUpdate}
        data-type="double"
      />
      {creatingBankTransaction === true ? (
        <MDBInput
          name="finalAmount"
          label="Final Amount"
          value={newSession.finalAmount}
          onChange={handlerUpdate}
          data-type="double"
        />
      ) : null}
      {creatingBankTransaction === false ? (
        <MDBInput
          name="suggestedLot"
          label="Suggested Lot"
          value={newSession.suggestedLot}
          onChange={handlerUpdate}
          data-type="double"
        />
      ) : null}
      {creatingBankTransaction === false ? (
        <MDBInput
          name="facilitator"
          label="Facilitator"
          value={newSession.facilitator}
          onChange={handlerUpdate}
        />
      ) : null}
      <MDBBtn onClick={addSessionHandler}>Save Session</MDBBtn>
    </div>
  );
};

export default AddSessionComponent;
