import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { revertButtonState } from './ducks/modules/button';

export const socket = io('http://localhost:8000');

class App extends Component {
  constructor() {
      super();
      this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
      socket.emit('get-state');
      socket.on('change-all', (ms) => {
          this.props.revertButtonState(ms);
      });
      socket.on('set-state', (ms) => {
          this.props.revertButtonState(ms);
      });
  }

  handleClick() {
      this.props.revertButtonState();
      socket.emit('change', Date.now());
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
