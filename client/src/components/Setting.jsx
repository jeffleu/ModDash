import React from 'react';
import { RadioGroup, Radio } from 'react-radio-group';
import { Button, closeButton, Glyphicon, Modal } from 'react-bootstrap';

class Setting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // showSettings: false,
      phoneNumber: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
  }

  onPhoneNumberChange(e) {
    this.setState({ phoneNumber: e.target.value });
  }

  handleSubmit() {
    // e.preventDefault();

    // TO DO: Do not allow user to submit if phone number is null or not correctly formatted.

    var token = localStorage.getItem('token');
    var settings = { phoneNumber: this.state.phoneNumber };

    fetch('http://velocitydash.com/api/users/updatePhoneNumber', {
      method: 'POST',
      body: JSON.stringify(settings),
      mode: 'cors-with-forced-preflight',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      }
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('responded back with', data);
    })
    .catch((err) => {
      console.log('did not save mode to db', err);
    });

    this.props.toggleSettings();
  }

  render() {
    return (
      <div>
        <Modal className="ModalForm" show={this.props.settingsIsOpen} onHide={this.props.toggleSettings}>
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="modal-title">Settings</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <form className="settings-form" onSubmit={this.handleSubmit}>
              If you wish to receive text notifications for real-time traffic before getting to your event, please enter it below:<br/>
              <input type="text" value={this.state.phoneNumber} placeholder="(ex. xxxxxxxxxx)" onChange={this.onPhoneNumberChange} />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <Button bsSize="small" onClick={this.props.toggleSettings}>Cancel</Button>
              <Button bsSize="small" type="submit" onClick={this.handleSubmit}>Save Changes</Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Setting;
