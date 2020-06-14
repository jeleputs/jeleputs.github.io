import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBIcon } from 'mdbreact';

import React from 'react';

const AdminCardComponent = props => {
  const {
    title,
    label,
    comment,
    total,
    max,
    min,
    color,
    backgroundColor,
    icon,
    className,
  } = props;
  const labelToDisplay = isNaN(label) ? label : `$${label.toFixed(2)}`;
  return (
    <MDBCol xl="3" md="6" className="mb-r">
      <MDBCard className="cascading-admin-card">
        <div className="admin-up">
          <MDBIcon icon={icon} className={className} />
          <div className="data">
            <p>{title.toUpperCase()}</p>
            <h4>
              <strong>{labelToDisplay}</strong>
            </h4>
          </div>
        </div>
        <MDBCardBody>
          <div className={`progress bg ${backgroundColor}`}>
            {max && max > 1 && min < total ? (
              <div
                aria-valuemax={max}
                aria-valuemin={min}
                aria-valuenow={total}
                className={`progress-bar bg ${color}`}
                role="progressbar"
                style={{ width: `${(total / max) * 100}%` }}></div>
            ) : min > total ? (
              <div
                aria-valuemax={max}
                aria-valuemin={min}
                aria-valuenow={total}
                className={`progress-bar bg danger-color`}
                role="progressbar"
                style={{ width: `${(total / max) * 100}%` }}></div>
            ) : null}
          </div>
          <MDBCardText>{comment}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default AdminCardComponent;
