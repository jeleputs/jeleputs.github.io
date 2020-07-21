import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBRow } from 'mdbreact';

import { AdminCardComponent } from './AdminCardComponent';
import { Doughnut } from 'react-chartjs-2';
import React from 'react';
import propTypes from 'prop-types';

const AdminCardSection1 = props => {
  const { thisWeeksSessions, accountConfiguration } = props;

  const thisWeeksInitialAmount =
    thisWeeksSessions.length >= 1
      ? thisWeeksSessions.sort((a, b) => (a.id > b.id ? 1 : -1))[0]
          .initialAmount
      : 0;

  const thisWeeksDeposits = thisWeeksSessions.reduce(
    (prev, curr) =>
      curr.isDeposit === true
        ? prev + curr.finalAmount - curr.initialAmount
        : prev,
    0
  );

  const thisWeeksTarget =
    (thisWeeksInitialAmount + thisWeeksDeposits) *
    (1 + accountConfiguration.weeklyGoalPerc / 100);

  const thisWeeksScore = thisWeeksSessions
    .map(session => {
      return session.transactions.reduce(
        (prev, curr) =>
          curr.isWon === true ? [prev[0] + 1, prev[1]] : [prev[0], prev[1] + 1],
        [0, 0]
      );
    })
    .reduce((prev, curr) => [prev[0] + curr[0], prev[1] + curr[1]], [0, 0]);

  const currentAmount =
    thisWeeksSessions.length >= 1
      ? thisWeeksSessions.sort((a, b) => (a.id < b.id ? 1 : -1))[0].finalAmount
      : 0;

  const toTrade =
    accountConfiguration.targetTransactionsPerWeek -
      thisWeeksScore[0] -
      thisWeeksScore[1] >=
    0
      ? accountConfiguration.targetTransactionsPerWeek -
        thisWeeksScore[0] -
        thisWeeksScore[1]
      : 0;
  const dataDoughnut = {
    labels: ['Won', 'Lost', 'To Trade'],

    datasets: [
      {
        data: [thisWeeksScore[0], thisWeeksScore[1], toTrade],
        backgroundColor: ['#46BFBD', '#F7464A', '#FDB45C'],
        hoverBackgroundColor: ['#5AD3D1', '#FF5A5E', '#FFC870'],
      },
    ],
  };
  return (
    <div>
      <MDBRow className="mb-4">
        <MDBCol sm="8">
          <MDBRow>
            {' '}
            <AdminCardComponent
              title="Week's $ initial"
              total={thisWeeksInitialAmount}
              label={thisWeeksInitialAmount}
              color="grey"
              icon="dollar-sign"
              className="success-color"
            />
            <AdminCardComponent
              title="Current $"
              total={currentAmount}
              label={currentAmount}
              color="grey"
              icon="dollar-sign"
              className="success-color"
            />
            <AdminCardComponent
              title="Week's Target"
              comment={`$${currentAmount}`}
              total={currentAmount}
              label={thisWeeksTarget}
              min={thisWeeksInitialAmount}
              max={thisWeeksTarget}
              color="blue"
              icon="chart-pie"
              className="light-blue lighten-1"
            />{' '}
            <AdminCardComponent
              title="Percentaje to target"
              comment={currentAmount}
              total={currentAmount}
              label={`${Math.round(
                (thisWeeksTarget / currentAmount - 1) * 10000
              ) / 100}%`}
              min={thisWeeksInitialAmount + thisWeeksDeposits}
              max={thisWeeksTarget}
              color="blue"
              icon="chart-pie"
              className="light-blue lighten-1"
            />
          </MDBRow>
        </MDBCol>
        <MDBCol sm="4">
          <MDBCol sm="12" className="mb-4">
            <MDBCard className="mb-4">
              <MDBCardHeader>Week's tranasctions</MDBCardHeader>
              <MDBCardBody>
                <Doughnut
                  data={dataDoughnut}
                  height={300}
                  options={{ responsive: true }}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBCol>
      </MDBRow>
    </div>
  );
};
AdminCardSection1.propTypes = {
  thisWeeksSessions: propTypes.array,
};
AdminCardSection1.defaultProps = {
  thisWeeksSessions: [{ id: 0, initialAmount: 0, finalAmount: 0 }],
};

export default AdminCardSection1;
