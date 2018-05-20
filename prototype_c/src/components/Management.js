import React from 'react';
import {Nav, NavItem, NavLink, TabContent, TabPane, ListGroup, ListGroupItem, Card, CardTitle, Button} from 'reactstrap';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {storage} from "../game";

import './Management.css'

const describeActivity = (activityType) => {
  switch (activityType) {
    case "idle":
      return "doing nothing";
    default: return activityType;
  }
};

function PersonProfile(props) {
  return (
    <Card>
      <CardTitle>{props.person.name}</CardTitle>
      <div>He is working very hard on {describeActivity(props.activity.type)}</div>
    </Card>
  )
}

PersonProfile.propTypes = {
  person: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired
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
              onClick={this.selectTab.bind(this, 'people')}>
              People
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.activeTab === 'storage' ? 'active' : null}
              onClick={this.selectTab.bind(this, 'storage')}>
              Storage
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.activeTab === 'dev' ? 'active' : null}
              onClick={this.selectTab.bind(this, 'dev')}>
              Development
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="people">
            <h1>List of all people</h1>
            <ListGroup>
              {this.props.people.map((person, i) =>
                <ListGroupItem key={i}><PersonProfile person={person}
                                                      activity={this.props.activities[person.id]}/>
                </ListGroupItem>)}
            </ListGroup>
          </TabPane>
          <TabPane tabId="storage">
            <h1>Here all you've got in your storage</h1>
            <ListGroup>
              {storage(this.props.storage).allItems()
                .map((item) => (<ListGroupItem key={item.id}> {item.id}: {item.count} </ListGroupItem>))}
            </ListGroup>
          </TabPane>
          <TabPane tabId="dev">
            <h1>Useful development information</h1>
            Tick count: {this.props.tickCount}{' '}
            <Button color="primary">Log state</Button>{' '}
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tickCount: state.tick,
  people: state.people.profiles,
  activities: state.people.activities,
  storage: state.storage
});

export default connect(mapStateToProps)(Management);