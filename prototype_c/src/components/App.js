import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Button, Container, Row, Col } from 'reactstrap';
import Management from './Management.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Incremental Prototype C (Mechanics)</h1>
        </header>
        <Container>
          <Row>
            <Col>
              <Button color="primary">Log state</Button>{' '}
            </Col>
          </Row>
          <Row>
            <Col>
              <Management/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;