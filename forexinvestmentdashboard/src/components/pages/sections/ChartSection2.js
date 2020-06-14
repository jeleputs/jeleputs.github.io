import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBRow } from 'mdbreact';

import React from 'react';

const ChartSection2 = props => {
  const {
    thisWeeksSessions,
    thisMonthsSessions,
    accountConfiguration,
    sessions,
  } = props;

  const thisWeeksScore = thisWeeksSessions
    .map(session => {
      return session.transactions.reduce(
        (prev, curr) =>
          curr.isWon === true ? [prev[0] + 1, prev[1]] : [prev[0], prev[1] + 1],
        [0, 0]
      );
    })
    .reduce((prev, curr) => [prev[0] + curr[0], prev[1] + curr[1]], [0, 0]);

  const weekNumber = dt => {
    const today = new Date(dt);
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const labels = thisMonthsSessions
    .filter(session => session.isDeposit !== true)
    .map(session => session.dateTime)
    .reduce((prev, curr) => {
      if (!prev.pop() || prev.pop() !== weekNumber(curr)) {
        return [...prev, weekNumber(curr)];
      } else {
        return prev;
      }
    }, []);

  const totalWeeklyVolume = thisMonthsSessions
    .filter(session => session.isDeposit !== true)
    .sort((a, b) => (a.id > b.id ? 1 : -1))
    .map(session => ({
      id: session.id,
      weekNumber: weekNumber(session.dateTime),
      earnings: session.transactions.reduce(
        (prev, curr) =>
          curr.earnedAmount >= 0
            ? { ...prev, won: prev.won + curr.earnedAmount }
            : { ...prev, lost: prev.lost + curr.earnedAmount },
        { won: 0, lost: 0 }
      ),
    }))
    .reduce((prev, curr) => {
      if (!prev[0] || !prev[0].weekNumber) {
        return [{ ...curr }];
      } else {
        const lastElement = prev[prev.length - 1];

        if (curr.weekNumber !== lastElement.weekNumber) {
          return [
            ...prev,
            { weekNumber: curr.weekNumber, earnings: curr.earnings },
          ];
        } else {
          return [
            ...prev.slice(0, -1),
            {
              weekNumber: lastElement.weekNumber,
              earnings: {
                won: lastElement.earnings.won + curr.earnings.won,
                lost: lastElement.earnings.lost + curr.earnings.lost,
              },
            },
          ];
        }
      }
    }, [])
    .map(total => {
      return {
        weekNumber: total.weekNumber,
        earnings: {
          won: Math.round(total.earnings.won * 100) / 100,
          lost: Math.round(total.earnings.lost * 100) / 100,
        },
      };
    });

  const dataBar = {
    labels,
    datasets: [
      {
        label: 'Pérdidas por semana',
        data: totalWeeklyVolume.map(weeklyVolume => weeklyVolume.earnings.lost),
        backgroundColor: '#F7464A',
        borderWidth: 1,
      },
      {
        label: 'Ganancias por semana',
        data: totalWeeklyVolume.map(weeklyVolume => weeklyVolume.earnings.won),
        backgroundColor: '#46BFBD',
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

  const dataLine = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
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
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const dataRadar = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: '#1',
        backgroundColor: 'rgba(245, 74, 85, 0.2)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: '#2',
        backgroundColor: 'rgba(90, 173, 246, 0.2)',
        data: [12, 42, 121, 56, 24, 12, 2],
      },
      {
        label: '#3',
        backgroundColor: 'rgba(245, 192, 50, 0.2)',
        data: [2, 123, 154, 76, 54, 23, 5],
      },
    ],
  };

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
    <MDBRow className="mb-4">
      <MDBCol md="12" lg="4" className="mb-4">
        <MDBCard className="mb-4">
          <MDBCardHeader>Month's total volume</MDBCardHeader>
          <MDBCardBody>
            <Bar data={dataBar} height={500} options={barChartOptions} />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol md="12" lg="4" className="mb-4">
        <MDBCard className="mb-4">
          <MDBCardHeader>Line chart</MDBCardHeader>
          <MDBCardBody>
            <Line data={dataLine} options={{ responsive: true }} />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol md="12" lg="4" className="mb-4">
        <MDBCard className="mb-4">
          <MDBCardHeader>Monthly Mistakes</MDBCardHeader>
          <MDBCardBody>
            <Radar
              data={dataRadar}
              height={300}
              options={{ responsive: true }}
            />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol md="12" lg="4" className="mb-4">
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
      <MDBCol md="12" lg="4" className="mb-4">
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
    </MDBRow>
  );
};

export default ChartSection2;
