import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Button, Container, Row, Col } from 'reactstrap';
import PerfDisplay from './perfDisplay.js'

class App extends Component {
  state = {
    byTimeout: {
      money: 0, expectedMoney: 0, startTime: undefined
    },
    byInterval: {
      money: 0, expectedMoney: 0, startTime: undefined
    },
    byAnimationFrame: {
      money: 0, expectedMoney: 0, startTime: undefined
    }
  }


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

export default App;
