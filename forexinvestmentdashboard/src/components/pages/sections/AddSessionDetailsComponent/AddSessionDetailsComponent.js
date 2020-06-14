import { MDBBtn, MDBInput, MDBSwitch } from 'mdbreact';
import React, { useEffect, useState } from 'react';

const AddSessionDetailsComponent = props => {
  const {
    sessions,
    setSessions,
    sessionEditing,
    accountConfiguration,
    catalogues,
  } = props;

  const thisSession = [
    ...sessions.filter(session => session.id === sessionEditing),
  ][0];

  const [newTransaction, setNewTransaction] = useState({
    id: 0,
    isBuy: false,
    suggestedLot: 0,
    amount: 0,
    earnedAmount: 0,
    isWon: false,
    notes: '',
    reasonOfLoss: 0,
  });

  const handlerUpdate = e => {
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSelectUpdate = e => {
    setNewTransaction({
      ...newTransaction,
      reasonOfLoss: parseInt(e.target.options[e.target.selectedIndex].value),
    });
  };

  const handlerUpdateIsWon = () => {
    setNewTransaction({
      ...newTransaction,
      isWon: !newTransaction.isWon,
    });
  };

  const handlerUpdateIsBuy = () => {
    setNewTransaction({
      ...newTransaction,
      isBuy: !newTransaction.isBuy,
    });
  };

  const addTransactionHandler = () => {
    const otherSessions = [
      ...sessions.filter(session => session.id !== sessionEditing),
    ];
    setSessions([
      ...otherSessions,
      {
        ...thisSession,
        transactions: [
          ...thisSession.transactions.filter(
            transaction => transaction.id !== newTransaction.id
          ),
          {
            ...newTransaction,
            amount:
              Math.round(parseFloat(newTransaction.amount) * 100) / 100 || 0,
            earnedAmount:
              Math.round(parseFloat(newTransaction.earnedAmount) * 100) / 100 ||
              0,
          },
        ].sort((a, b) => (a.id > b.id ? 1 : -1)),
        finalAmount:
          thisSession.initialAmount +
          thisSession.transactions
            .filter(transaction => transaction.id !== newTransaction.id)
            .reduce(
              (prev, curr) =>
                prev + Math.round(parseFloat(curr.earnedAmount) * 100) / 100 ||
                0,
              Math.round(parseFloat(newTransaction.earnedAmount) * 100) / 100 ||
                0
            ),
      },
    ]);
  };

  const editTransactionHandler = transaction => {
    setNewTransaction(transaction);
  };

  useEffect(() => console.log('newTransaction', newTransaction), [
    newTransaction,
  ]);

  useEffect(() => {
    const amount =
      Math.round(
        accountConfiguration.suggestedLotSizes * thisSession.finalAmount * 100
      ) / 100;

    const id =
      sessions
        .map(session => {
          const trans = session.transactions.reduce((prev, act) => {
            return act.id > prev ? act.id : prev;
          }, 0);
          return trans;
        })
        .reduce((prev, act) => (act > prev ? act : prev), 0) + 1;

    setNewTransaction({
      id,
      isBuy: false,
      suggestedLot: amount,
      amount,
      earnedAmount: 0,
      isWon: false,
      notes: '',
      reasonOfLoss: 0,
    });
  }, [sessions]);
  return (
    <table className="table">
      <tbody>
        <tr>
          <td>
            <MDBSwitch
              name="isBuy"
              checked={newTransaction.isBuy === true ? true : false}
              onChange={handlerUpdateIsBuy}
              labelLeft="sell"
              labelRight="buy"
            />
          </td>
          <td>
            <MDBInput
              name="amount"
              label="Amount"
              value={newTransaction.amount}
              onChange={handlerUpdate}
              data-type="double"
              onFocus={e => e.target.select()}
            />
          </td>
          <td>
            <MDBInput
              name="earnedAmount"
              label="Earned"
              value={newTransaction.earnedAmount}
              onChange={handlerUpdate}
              data-type="double"
              onFocus={e => e.target.select()}
            />
          </td>
          <td>
            <MDBSwitch
              name="isWon"
              checked={newTransaction.isWon === true ? true : false}
              onChange={handlerUpdateIsWon}
              labelLeft="lost"
              labelRight="won"
            />
          </td>
          <td>
            <select
              name="reasonOfLoss"
              className="browser-default custom-select"
              onChange={handlerSelectUpdate}>
              {catalogues.reasonsOfLoss.map(reason => (
                <option key={reason.value} value={reason.value}>
                  {reason.text}
                </option>
              ))}
            </select>
          </td>
          <td>
            <MDBInput
              name="notes"
              label="notes"
              value={newTransaction.notes}
              onChange={handlerUpdate}
            />
          </td>
          <td>
            <MDBBtn onClick={addTransactionHandler} size="sm" gradient="aqua">
              Save
            </MDBBtn>
          </td>
        </tr>
        {thisSession.transactions.map((transaction, i) => (
          <tr key={i}>
            <td>
              {transaction.isBuy ? (
                <p>
                  Buy <span className="text-success">↑</span>
                </p>
              ) : (
                <p>
                  Sell <span className="text-danger">↓</span>
                </p>
              )}
            </td>
            <td>{transaction.amount}</td>
            <td>{transaction.earnedAmount}</td>
            <td>
              {transaction.isWon ? (
                <span className="badge success-color badge-success-color badge-pill ">
                  {'Won'}
                </span>
              ) : (
                <span className="badge danger-color badge-danger-color badge-pill ">
                  {'Lost'}
                </span>
              )}
            </td>
            <td>
              {transaction.reasonOfLoss
                ? catalogues.reasonsOfLoss.filter(
                    reason => reason.value === transaction.reasonOfLoss
                  )[0].text
                : catalogues.reasonsOfLoss[0].text}
            </td>
            <td>{transaction.notes}</td>
            <td>
              <MDBBtn
                onClick={() => editTransactionHandler(transaction)}
                size="sm"
                gradient="purple">
                Edit
              </MDBBtn>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AddSessionDetailsComponent;
