import React from 'react';
import { RadioGroup, Radio } from 'react-radio-group';
import { Button, closeButton, Glyphicon, Modal } from 'react-bootstrap';
class Setting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSettings: false,
      phoneNumber: ''
    };

    // Set 'this' bindings
    this.showSettings = this.showSettings.bind(this);
    this.hideSettings = this.hideSettings.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
  }

  shouldComponentUpdate() {
    if (this.props.transitMode) {
      return true;
    }

    return false;
  }

  showSettings() {
    this.setState({
      showSettings: true
    });
  }

  hideSettings() {
    this.setState({
      showSettings: false
    });
  }

  // TO DO: Need to refactor to handle transit mode and phone number update in DB
  handleSubmit() {
    // e.preventDefault();
    var token = localStorage.getItem('token');
    var settings = {
      transit: this.props.transitMode,
      phoneNumber: this.state.phoneNumber
    };

    fetch('ec2-52-33-110-254.us-west-2.compute.amazonaws.com:9000/api/users/updateSettings', {
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

    // Hide settings after submit
    this.setState({ showSettings: false });
  }

  onPhoneNumberChange(e) {
    this.setState({
      phoneNumber: e.target.value
    });
  }

  render() {
    return (
      <div>
        <div className='settings-glyph' onClick={this.showSettings}>
          <Glyphicon glyph="cog" />
        </div>

        <Modal className="ModalForm" show={this.state.showSettings} onHide={this.hideSettings}>
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="settings-title">Settings</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="settings-body">
            <form className="settings-form" onSubmit={this.handleSubmit}>
              <RadioGroup name="transit" selectedValue={this.props.transitMode} onChange={this.props.transitChange}>
                <div className="transit-selection">Choose Your Transportation</div>
                <Radio value="driving" /> Driving <br/>
                <Radio value="walking" /> Walking <br/>
                <Radio value="transit" /> Transit <br/>
                <Radio value="bicycling" /> Bicycling
              </RadioGroup>

              <div className="phone-number-input">
                If you wish to receive text notifications for real-time traffic before getting to your event, please enter it below:<br/>
                <input type="text" value={this.state.phoneNumber} placeholder="(ex. xxxxxxxxxx)" onChange={this.onPhoneNumberChange} />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <Button bsSize="small" onClick={this.hideSettings}>Cancel</Button>
              <Button bsSize="small" type="submit" onClick={this.handleSubmit}>Save Changes</Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Setting;
