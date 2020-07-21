import { Bar, Line, Radar } from 'react-chartjs-2';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBRow } from 'mdbreact';

import React from 'react';
import propTypes from 'prop-types';

const ChartSection1 = props => {
  // eslint-disable-next-line no-unused-vars
  const { thisWeeksSessions, lastFiveWeeksSessions, catalogues } = props;

  const labels =
    thisWeeksSessions.length > 0
      ? thisWeeksSessions
          .filter(session => session.isDeposit !== true)
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map(session => session.dateTime)
      : [''];
  const data =
    thisWeeksSessions.length > 0
      ? thisWeeksSessions
          .filter(session => session.isDeposit !== true)
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map(
            session =>
              Math.round((session.finalAmount - session.initialAmount) * 100) /
              100
          )
      : [''];

  const lastFiveWeeksEarnings = lastFiveWeeksSessions
    .sort((a, b) => (a.id > b.id ? 1 : -1))
    .map(session => {
      return session.transactions
        .map(transaction => Math.round(transaction.earnedAmount * 100) / 100)
        .reduce((prev, curr) => Math.round((prev + curr) * 100) / 100, 0);
    });

  const lastFiveWeeksComulated = lastFiveWeeksEarnings.map((earnings, i) =>
    lastFiveWeeksEarnings.reduce(
      (prev, curr, j) =>
        j <= i ? Math.round((prev + curr) * 100) / 100 : prev,
      0
    )
  );

  const dataLine = {
    labels: lastFiveWeeksComulated,
    datasets: [
      {
        label: 'total cumulated money',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: lastFiveWeeksComulated,
      },
    ],
  };

  const dataBar = {
    labels,
    datasets: [
      {
        label: 'Earnings by session $',
        data,
        backgroundColor: '#BADA55',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          barPercentage: 1,
          gridLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)',
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const weekNumber = dt => {
    const today = new Date(dt);
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const countMistakes = weeksFromNow => {
    const now = new Date();
    const initialDate = new Date();
    initialDate.setDate(now.getDate() - now.getDay() - 7 * weeksFromNow);
    initialDate.setHours(0, 0, 0, 0);
    const finalDate = new Date();
    finalDate.setDate(now.getDate() - now.getDay() - 7 * (weeksFromNow - 1));
    finalDate.setHours(0, 0, 0, 0);
    const countedMistakes = lastFiveWeeksSessions
      .filter(session => {
        const SessionDate = new Date(session.dateTime);
        return SessionDate >= initialDate && SessionDate <= finalDate;
      })
      .reduce((prev, session) => [...prev, ...session.transactions], [])
      .filter(transaction => transaction.isWon === false)
      .map(transaction => {
        return typeof transaction.reasonOfLoss !== 'undefined'
          ? {
              reason: transaction.reasonOfLoss,
              total: Math.abs(Math.round(transaction.earnedAmount * 100) / 100),
            }
          : {
              reason: 0,
              total: Math.abs(Math.round(transaction.earnedAmount * 100) / 100),
            };
      })
      .reduce((prev, curr) => {
        if (typeof prev[curr.reason] !== 'undefined') {
          return {
            ...prev,
            [curr.reason]: {
              count: prev[curr.reason].count + 1,
              total: prev[curr.reason].total + curr.total,
            },
          };
        } else {
          return {
            ...prev,
            [curr.reason]: { count: 1, total: curr.total },
          };
        }
      }, []);
    return {
      weekOf: initialDate,
      weekNumber: weekNumber(initialDate),
      data: catalogues.reasonsOfLoss.map((reason, i) =>
        countedMistakes[i] ? countedMistakes[i].count : 0
      ),
      total: catalogues.reasonsOfLoss.map((reason, i) =>
        countedMistakes[i] ? countedMistakes[i].total : 0
      ),
    };
  };
  const MistakesByWeek = [
    countMistakes(4),
    countMistakes(3),
    countMistakes(2),
    countMistakes(1),
    countMistakes(0),
  ];

  const backgroundColors = [
    'rgba(245, 74, 85, 0.2)',
    'rgba(90, 173, 246, 0.2)',
    'rgba(245, 192, 50, 0.2)',
    'rgba(127, 240, 14, 0.2)',
    'rgba(270, 173, 246, 0.2)',
  ];

  const dataRadar = {
    labels: catalogues.reasonsOfLoss.map(reason => reason.shortText),
    datasets: [
      ...MistakesByWeek.map((data, i) => {
        return {
          label: data.weekNumber,
          data: data.data,
          backgroundColor: backgroundColors[i],
        };
      }),
    ],
  };

  const dataRadar2 = {
    labels: catalogues.reasonsOfLoss.map(reason => reason.shortText),
    datasets: [
      ...MistakesByWeek.map((data, i) => {
        return {
          label: data.weekNumber,
          data: data.total,
          backgroundColor: backgroundColors[i],
        };
      }),
    ],
  };

  return (
    <fragment>
      <MDBRow className="mb-4">
        <MDBCol md="4" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader>Earnings, this week</MDBCardHeader>
            <MDBCardBody>
              <Bar data={dataBar} height={500} options={barChartOptions} />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="12" lg="8" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader> Cumulated, last five weeks</MDBCardHeader>
            <MDBCardBody>
              <Line data={dataLine} options={{ responsive: true }} />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-4">
        <MDBCol md="6" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader>Weekly Mistakes</MDBCardHeader>
            <MDBCardBody>
              <Radar
                data={dataRadar}
                height={300}
                options={{ responsive: true }}
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="6" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader>Weekly Mistakes in $$</MDBCardHeader>
            <MDBCardBody>
              <Radar
                data={dataRadar2}
                height={300}
                options={{ responsive: true }}
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </fragment>
  );
};

ChartSection1.propTypes = {
  thisWeeksSessions: propTypes.array,
};
ChartSection1.defaultProps = {
  thisWeeksSessions: [{ id: 0, initialAmount: 0, finalAmount: 0 }],
};

export default ChartSection1;
