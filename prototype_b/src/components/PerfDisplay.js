import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';

const diffMoney = sliceName => sliceName.expectedMoney - sliceName.money;

const PerfDisplay = ({title, sliceName, perfData}) => (
  <Card>
    <CardTitle>{title}</CardTitle>
    <CardText id='moneys'>Expected money: {perfData[sliceName].expectedMoney},
      Actual money: {perfData[sliceName].money},
      Diff: {diffMoney(perfData[sliceName])}</CardText>
  </Card>
)

const mapStateToProps = state => ({
    perfData: state.perf
})


PerfDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  sliceName: PropTypes.string.isRequired
}


export default connect(mapStateToProps)(PerfDisplay);
