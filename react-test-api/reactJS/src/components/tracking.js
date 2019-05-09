import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class tracking extends Component {
  render() {
    return (
    <div className="App">
      <h1>Tracking</h1>
      {/* Link to List.js */}
      <Link to={'./tSummary'}>
        <button variant="raised">
            Tracking Summary
        </button>
      </Link>
      <br />
      <br />
      <Link to={'./tDetail'}>
        <button variant="raised">
            Tracking Detail
        </button>
      </Link>
    </div>
    );
  }
}
export default tracking;

//////////////////////////////////////////

// import React, {Component} from 'react';
// import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
// import {Link, Route} from 'react-router-dom';

// function tracking() {
// 	return (
// 		<div>
// 			{/*<Route path='../api/tracking/app.js'>tracking</Route>*/}  
// 			<Route>tracking</Route>
// 		</div>
// 	);
// }

// export default tracking;