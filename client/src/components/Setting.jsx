import React from 'react';
import { RadioGroup, Radio } from 'react-radio-group';
import { Button, closeButton, Glyphicon, Modal } from 'react-bootstrap';
class Setting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSettings: false,
      transitMode: '',
      phoneNumber: null
    };

    // this.showSettings.bind(this);
    // this.hideSettings.bind(this);
  }

  // componentDidMount() {
  //
  // }

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

  handleChangeTransitMode(value) {
    // e.preventDefault();
    console.log('value', value);
    this.setState({
      selectedOption: value
    });
  }

  // TO DO: Need to refactor to handle transit mode and phone number update in DB
  handleSubmit() {
    // e.preventDefault();
    var token = localStorage.getItem('token');
    var state = this.state.selectedOption;
    this.props.transitChange(state);
    var transit = {transit: state};

    console.log('transit', transit);
    fetch('http://localhost:9000/api/users/updateTransit', {
      method: 'POST',
      body: JSON.stringify(transit),
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

    this.setState({
      showSettings: false
    });
  }

  render() {
    return (
      <div>
        <div className='settings-glyph' onClick={this.showSettings.bind(this)}>
          <Glyphicon glyph="cog" />
        </div>

        <Modal className="ModalForm" show={this.state.showSettings} onHide={this.hideSettings.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title> 
              <div className="settings-title">Settings</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="settings-body">
            <form className="settings-form" onSubmit={this.handleSubmit}>
              <RadioGroup name="transit" selectedValue={this.state.selectedOption} onChange={this.handleChangeTransitMode.bind(this)}>
                Choose Your Transportation <br/>
                <Radio value="driving" /> Driving <br/>
                <Radio value="walking" /> Walking <br/>
                <Radio value="transit" /> Transit <br/>
                <Radio value="bicyling" /> Bicycling
              </RadioGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
              <div>
                <Button bsSize="small" onClick={this.hideSettings.bind(this)}> Nah </Button>
                <Button bsSize="small" type="submit" onClick={this.handleSubmit}>Looks Good </Button>
              </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  // render() {
  //   let radio =
  //   <div className='trans-mode'>
  //     <div>
  //       <RadioGroup name="transit" selectedValue={this.state.selectedOption} onChange={this.handleChangeTransitMode.bind(this)}>
  //         Choose Your Transportation <br/>

  //         <Radio value="driving" /> Driving <br/>
  //         <Radio value="walking" /> Walking <br/>
  //         <Radio value="transit" /> Transit <br/>
  //         <Radio value="bicyling" /> Bicycling
  //       </RadioGroup>
  //     </div>
  //     <div className='radio-button'>
  //       <button type='button' onClick={this.handleSubmit.bind(this)}>Submit</button>
  //     </div>
  //   </div>;

  //   return (
  //     <div>
  //       <div className='settings-glyph' onClick={this.clickSetting}> <Glyphicon glyph="cog" /></div>
  //       {this.state.showSettings ? radio : null}
  //     </div>
  //   );
  // }
}

export default Setting;