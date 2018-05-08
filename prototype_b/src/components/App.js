import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';

import { Button, Container, Row, Col } from 'reactstrap';
import PerfDisplay from './PerfDisplay.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Incremental Prototype A</h1>
        </header>
        <Container>
          <Row>
            <Col>
              Tick count: {this.props.tickCount}
              <Button color="primary">Click me</Button>{' '}
              <PerfDisplay title='By Timeout' sliceName='byTimeout'/>
              <PerfDisplay title='By Interval' sliceName='byInterval'/>
              <PerfDisplay title='By Animation Frame' sliceName='byAnimationFrame'/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  tickCount: state.tick
})
export default connect(mapStateToProps)(App);
