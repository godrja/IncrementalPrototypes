import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Button, Container, Row, Col } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Incremental Prototype A</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          Here is my first attempt to make a react application.
          <br/>Hello!

          <Container>
            <Row>
              <Col>
                <Button color="primary">Click me</Button>{' '}
              </Col>
            </Row>
          </Container>
        </p>
      </div>
    );
  }
}

export default App;
