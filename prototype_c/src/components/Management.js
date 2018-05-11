import React from 'react';
import {Nav, NavItem, NavLink, TabContent, TabPane, ListGroup, ListGroupItem, Card, CardTitle} from 'reactstrap';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import './Management.css'
import {person} from "../game";

function PersonProfile(props) {
  const job = person(props.person).currentJob(props.jobs);
  return (
    <Card>
      <CardTitle>{props.person.name}</CardTitle>
      <div>He is working very hard on {job.type} ({job.done} ticks completed}</div>
    </Card>
  )
}
PersonProfile.propTypes = {
  person: PropTypes.object.isRequired,
  jobs: PropTypes.array.isRequired
};

class Management extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'people'
    };
  }

  selectTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={this.state.activeTab === 'people' ? 'active' : null}
              onClick={ this.selectTab.bind(this, 'people') }>
              People
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.activeTab === 'dev' ? 'active' : null}
              onClick={ this.selectTab.bind(this, 'dev') }>
              Development
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="people">
            <h1>List of all people</h1>
            <ListGroup>
              {this.props.people.map((person, i) =>
                <ListGroupItem key={i}><PersonProfile person={person} jobs={this.props.jobs}/></ListGroupItem>)}
            </ListGroup>
          </TabPane>
          <TabPane tabId="dev">
            <h1>Useful development information</h1>
            Tick count: {this.props.tickCount}{' '}
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ tickCount: state.tick, people: state.people, jobs: state.jobs });

export default connect(mapStateToProps)(Management);