'use strict';

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Loader from 'react-loader';
import { fetchStates, fetchStateJurisdictions } from '../actions/action';

let States = React.createClass({
  propTypes: {
    states: React.PropTypes.array,
    state_jurisdictions: React.PropTypes.array,
    dispatch: React.PropTypes.func,
    params: React.PropTypes.object
  },

  getId: function (id) {
    let _id = parseInt(id, 10);

    if (!_.isNaN(_id)) {
      return _id;
    } else {
      return 0;
    }
  },

  componentDidMount: function () {
    if (this.props.states.length === 0) {
      this.props.dispatch(fetchStates());
    }
    if (this.props.params.state_id) {
      this.props.dispatch(fetchStateJurisdictions(this.getId(this.props.params.state_id)));
    }
  },

  componentDidUpdate: function (prevProps) {
    if (prevProps.params.state_id !== this.props.params.state_id) {
      this.props.dispatch(fetchStateJurisdictions(this.getId(this.props.params.state_id)));
    }
  },

  render: function () {
    let { states, state_jurisdictions } = this.props;
    let list = [];
    let loaded = false;

    if (this.props.params.state_id) {
      if (state_jurisdictions.length > 0) {
        for (let i in state_jurisdictions) {
          let obj = state_jurisdictions[i];
          list.push(<p key={obj.id}><Link to={`/j/${obj.id}`}>{obj.name}</Link></p>);
        }
      }
    } else {
      for (let i in states) {
        let obj = states[i];
        list.push(<p key={obj.id}><Link to={`/states/${obj.id}`}>{obj.name}</Link></p>);
      }
    }

    if (list.length > 0) {
      loaded = true;
    }

    // Results HTML
    return (
      <div className='large'>
        <div id='results-container'>
          <br />
            <div className='columns medium-centered'>
              <div className='results-sub-container columns large medium-centered row'>
                <div className='results-split-container medium-5 columns'>
                <Loader loaded={loaded}>
                  {list}
                </Loader>
                </div>
              </div>
            </div>
        </div>
      </div>

    );
  }

});

function mapStateToProps (state) {
  return {
    states: state.states,
    state_jurisdictions: state.state_jurisdictions
  };
}

export default connect(mapStateToProps)(States);
