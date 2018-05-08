import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';

import { Button, Container, Row, Col } from 'reactstrap';

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
              Tick count: {this.props.tickCount}
              <Button color="primary">Click me</Button>{' '}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ tickCount: state.tick });

export default connect(mapStateToProps)(App);
