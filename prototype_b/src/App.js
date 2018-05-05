import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Engine from './Engine';

import { Button, Container, Row, Col, Card, CardText, CardTitle } from 'reactstrap';

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


  startByTimer(timer, sliceName) {
    timer(() => {
      const sliceState = this.state[sliceName];
      this.setState({[sliceName]: {
        startTime: sliceState.startTime ? sliceState.startTime : Date.now(),
        money: sliceState.money + 1,
        expectedMoney: Math.round((Date.now() - sliceState.startTime) / 100 + 1),
      }})
    });
  }


  componentDidMount() {
    const engine = new Engine();
    this.startByTimer(engine.bindClockTickByInterval, 'byInterval');
    this.startByTimer(engine.bindClockTickByTimeout, 'byTimeout');
    this.startByTimer(engine.bindClockTickByAnimationFrame, 'byAnimationFrame');
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Incremental Prototype B (redux)</h1>
        </header>
        <Container>
          <Row>
            <Col>
              <Button color="primary">Click me</Button>{' '}
              <Card>
                <CardTitle>By Timeout</CardTitle>
                <CardText id='moneys'>Expected money: {this.state.byTimeout.expectedMoney},
                  Actual money: {this.state.byTimeout.money},
                  Diff: {this.state.byTimeout.expectedMoney - this.state.byTimeout.money}</CardText>
              </Card>
              <Card>
                <CardTitle>By Interval</CardTitle>
                <CardText id='moneys'>Expected money: {this.state.byInterval.expectedMoney},
                  Actual money: {this.state.byInterval.money},
                  Diff: {this.state.byInterval.expectedMoney - this.state.byInterval.money}</CardText>
              </Card>
              <Card>
                <CardTitle>By Animation Frame</CardTitle>
                <CardText id='moneys'>Expected money: {this.state.byAnimationFrame.expectedMoney},
                  Actual money: {this.state.byAnimationFrame.money},
                  Diff: {this.state.byAnimationFrame.expectedMoney - this.state.byAnimationFrame.money}</CardText>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
