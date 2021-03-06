'use strict';

import React from 'react';
import { withRouter } from 'react-router-dom';
import Search from '../components/search';

class Frontpage extends React.Component {
  render () {
    const SearchWithHistory = withRouter(Search);
    return (
      <div className='row column'>
        <div className='welcome-mat'>
          <div className='banner-image'></div>
          <div className='banner-box'>
            <div className='banner-text'>
              <div className='text-header'>Be a Part of Democracy</div>
              <p><span>Look up information on how to work </span> <br /> <span>at the polls on Election Day.</span></p>
            </div>
            <SearchWithHistory />
          </div>
        </div>
        <div id='User-Locate-container'>
        </div>
        <div className='map-break'><a name='map'></a></div>
      </div>
    );
  }
}

export default Frontpage;
