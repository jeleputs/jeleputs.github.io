import { Bar, Pie } from 'react-chartjs-2';
import {
  MDBBadge,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
} from 'mdbreact';
import React, { Component } from 'react';

const ChartSection1 = props => {
  const { sessions } = props;
  const labels = sessions[0].id
    ? sessions.map(session => session.dateTime)
    : [''];
  const data = sessions[0].id
    ? sessions.map(session =>
        session.transactions.reduce(
          (prev, curr) => prev + parseFloat(curr.amountEarned),
          0
        )
      )
    : [''];

  const dataBar = {
    labels,
    datasets: [
      {
        label: 'Ganancias por sesión en %',
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
  return (
    <MDBRow className="mb-4">
      <MDBCol md="10" className="mb-4">
        <MDBCard className="mb-4">
          <MDBCardBody>
            <Bar data={dataBar} height={500} options={barChartOptions} />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol md="2" className="mb-4">
        <MDBCard className="mb-4">
          <MDBBtn>Mes</MDBBtn>
          <MDBBtn>Semana</MDBBtn>
        </MDBCard>
        <MDBCard className="mb-2">
          <MDBCardBody>
            <MDBListGroup className="list-group-flush">
              <MDBListGroupItem>
                Sales
                <MDBBadge color="success-color" pill className="float-right">
                  22%
                  <MDBIcon icon="arrow-up" className="ml-1" />
                </MDBBadge>
              </MDBListGroupItem>
              <MDBListGroupItem>
                Traffic
                <MDBBadge color="danger-color" pill className="float-right">
                  5%
                  <MDBIcon icon="arrow-down" className="ml-1" />
                </MDBBadge>
              </MDBListGroupItem>
              <MDBListGroupItem>
                Orders
                <MDBBadge color="primary-color" pill className="float-right">
                  14
                </MDBBadge>
              </MDBListGroupItem>
              <MDBListGroupItem>
                Issues
                <MDBBadge color="primary-color" pill className="float-right">
                  123
                </MDBBadge>
              </MDBListGroupItem>
              <MDBListGroupItem>
                Messages
                <MDBBadge color="primary-color" pill className="float-right">
                  8
                </MDBBadge>
              </MDBListGroupItem>
            </MDBListGroup>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol md="2" className="mb-4">
        {/* <MDBCard className="mb-4">
            <MDBCardHeader>Pie chart</MDBCardHeader>
            <MDBCardBody>
              <Pie data={dataPie} height={300} options={{ responsive: true }} />
            </MDBCardBody>
          </MDBCard> */}
      </MDBCol>
    </MDBRow>
  );
};

export default ChartSection1;
