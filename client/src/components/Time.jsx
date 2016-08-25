import React from 'react';

class Time extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: '',
      // date: moment().format('dddd, MMMM D')
    };
  }

  tick() {
    var time = moment(new Date());
    this.setState({
      time: time.format('h:mm:ss a')
    });
  }

  componentDidMount() {
    this.tick();
    setInterval(this.tick.bind(this), 1000);
  }

  render() {
    return (
      <div className='today'>
        <div className='time'>
          {this.state.time}
        </div>
      </div>
    );
  }
}
      //  <div className='date'>
        //  {this.state.date}
        // </div>

export default Time;
