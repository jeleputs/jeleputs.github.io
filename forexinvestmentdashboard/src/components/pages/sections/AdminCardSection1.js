import { AdminCardComponent } from './AdminCardComponent';
import { MDBRow } from 'mdbreact';
import React from 'react';
import propTypes from 'prop-types';

const AdminCardSection1 = props => {
  const { thisWeeksSessions, thisMonthsSessions } = props;

  const thisWeeksInitialAmount =
    thisWeeksSessions.length > 1
      ? thisWeeksSessions.sort((a, b) => (a.id > b.id ? 1 : -1))[0]
          .initialAmount
      : 0;

  const thisWeeksTarget = thisWeeksInitialAmount * 1.5;

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
    thisWeeksSessions.length > 1
      ? thisWeeksSessions.sort((a, b) => (a.id < b.id ? 1 : -1))[0].finalAmount
      : 0;

  return (
    <div>
      <MDBRow className="mb-4">
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
          title="Weeks's Score"
          comment="ganadas/perdidas"
          total={
            (thisWeeksScore[0] / (thisWeeksScore[0] + thisWeeksScore[1])) * 100
          }
          min={0}
          max={100}
          label={thisWeeksScore.join('/')}
          backgroundColor="danger-color"
          color="success-color"
          icon="chart-line"
          className="light-blue lighten-1"
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
        />
      </MDBRow>
      <MDBRow className="mb-4">
        {' '}
        <AdminCardComponent
          title="Percentaje to target"
          comment={currentAmount}
          total={currentAmount}
          label={`${Math.round((thisWeeksTarget / currentAmount - 1) * 10000) /
            100}%`}
          min={thisWeeksInitialAmount}
          max={thisWeeksTarget}
          color="blue"
          icon="chart-pie"
          className="light-blue lighten-1"
        />
        <AdminCardComponent
          title="Meta Del Mes"
          comment=""
          total={200}
          max={1000}
          color="grey"
          icon="dollar-sign"
          className="warning-color"
        />
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
