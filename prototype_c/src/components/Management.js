import React from 'react';
import {Nav, NavItem, NavLink, TabContent, TabPane, ListGroup, ListGroupItem} from 'reactstrap';
import './Management.css'
import {connect} from "react-redux";

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
          <TabPane tabId="1">
            <h1>List of all people</h1>
            <ListGroup>
              {this.props.people.map((person, i) =>
                <ListGroupItem key={i}>{person.name}</ListGroupItem>)}
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

const mapStateToProps = (state) => ({ tickCount: state.tick, people: state.people });

export default connect(mapStateToProps)(Management);