import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { revertButtonState } from './ducks/modules/button';

const socket = io('http://localhost:8000');

class App extends Component {
  constructor() {
      super();
      this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
      socket.on('change-all', () => {
          this.props.revertButtonState();
      });
  }

  handleClick() {
      this.props.revertButtonState();
      socket.emit('change', true);
  }

  render() {
    return (
      <div className="App">
        <button type='button' onClick={this.handleClick} disabled={this.props.buttonState}>Ok</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    buttonState: state.Button.payload,
});

export default connect(mapStateToProps, { revertButtonState })(App);
