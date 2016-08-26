import React from 'react';
import { Modal, closeButton, Button, Glyphicon } from 'react-bootstrap';
import { openCommandsModal } from '../scripts/commands';

class Commands extends React.Component {
  render() {
    return (
      <div>
        <Modal className="ModalForm" show={this.props.commandsIsOpen} onHide={this.props.toggleCommands}>
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="modal-title">Voice Commands</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div>
              <p>
                <b>Creating an event</b><br/>
                <i>"Create/Add/Make event [event name] at [location] at [date and time]."</i>
              </p>

              <p>
                <b>Getting the time</b><br/>
                <i>"What time is it?"</i>
              </p>

              <p>
                <b>Getting the date</b><br/>
                <i>"What's the date today?"</i>
              </p>

              <p>
                <b>Opening websites</b><br/>
                <i>"Open [website]"</i> (include ".com")
              </p>

              <p>
                <b>Searching YouTube</b><br/>
                <i>"Search YouTube for [something]"</i>
              </p>

              <p>
                <b>Searching Amazon</b><br/>
                <i>"Search Amazon for [item]"</i>
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Commands;