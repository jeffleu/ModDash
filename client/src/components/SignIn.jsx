import React from 'react';
import { Button } from 'react-bootstrap';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  login() {
    chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
      console.log(token);
      fetch('http://localhost:9000/extensionAuth', {
        method: 'POST',
        body: JSON.stringify({token: token}),
        mode: 'cors-with-forced-preflight',
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log('data back from extensionAuth', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('channel', data.channel);
        location.reload();
      });
    });
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('channel');
    // need to tell backend that we have logged out and that the current subscribed channel is no longer valid and to start polling for a new channel
    // or no log out button and they just have to uninstall the extension
    location.reload();
  }

  render() {
    let signInButton = <img className="signin" src="/assets/google_signin.png" onClick={this.login}/>

    return (
      <div>
        {localStorage.getItem('token') ? null : signInButton}
      </div>
    )
  }
}

export default SignIn;