import React from 'react';
import { Modal, closeButton, Button } from 'react-bootstrap';

class VerifiedPopup extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal show={this.props.verified} onHide={this.props.togglePopup}>
          <Modal.Header closeButton>
            <Modal.Title>
              <div> Thanks for signing up!</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div> If you want to find out more about Velocity Dashboard, check us out here! Otherwise, close this tab to proceed. </div>
          </Modal.Body>
        
        </Modal>
      </div>
    );
  }
};

export default VerifiedPopup;
