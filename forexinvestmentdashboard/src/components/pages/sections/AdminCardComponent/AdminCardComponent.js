import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBIcon } from 'mdbreact';

import React from 'react';

const AdminCardComponent = props => {
  const { title, comment, total, max, color, icon, className } = props;
  return (
    <MDBCol xl="2" md="6" className="mb-r">
      <MDBCard className="cascading-admin-card">
        <div className="admin-up">
          <MDBIcon icon={icon} className={className} />
          <div className="data">
            <p>{title.toUpperCase()}</p>
            <h4>
              <strong>{`$${total.toFixed(2)}`}</strong>
            </h4>
          </div>
        </div>
        <MDBCardBody>
          <div className="progress">
            {max && max > 1 ? (
              <div
                aria-valuemax={max}
                aria-valuemin="0"
                aria-valuenow={total}
                className={`progress-bar bg ${color}`}
                role="progressbar"
                style={{ width: `${(total / max) * 100}%` }}></div>
            ) : (
              ''
            )}
          </div>
          <MDBCardText>{comment}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default AdminCardComponent;
