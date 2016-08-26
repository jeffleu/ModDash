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
              <div className="modal-title">How to use Velocity</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div>
              <p>
                <b>Calendar syncing</b><br/>
                By signing in, you have given authorization to Velocity to sync with your Google calendar. To add an event, click on the plus icon or use your voice. To remove an event, click on the event and then click on the red X. 
              </p>
              <p>
                <b> Notifications </b><br/>
                Velocity is constantly checking for traffic conditions and travel times. It will send you a browser notification fifteen minutes before when you need to leave. You can change your transit mode by clicking on the road icon. And if you want to add your telephone number for Twilio text message notification (currently in beta), click on the settings icon.
              </p>
              <p>
                <b>Activating voice commands</b><br/>
                Click the volume icon for Velocity to start listening for commands. Listening is off by default.
              </p>
            </div>

            <div>
              <h3> Voice commands </h3>
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