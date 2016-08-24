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
              <div className="commands-modal-title">Voice Commands</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="ModalFormBody">
            <div>
              <p>
                <b>Create an event</b><br/>
                <i>"Create event [event name] at [location] at [date and time]."</i>
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Commands;