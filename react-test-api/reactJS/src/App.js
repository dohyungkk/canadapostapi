import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import './App.css';
import tracking from './components/tracking.js';
import tSummary from './components/tSummary.js';
import tDetail from './components/tDetail.js';

// class App extends Component {
//   render() {
//     const App = () => (
//       <div>
//         <Switch>
//           <Route exact path='/' component={Home}/>
//           <Route path='/list' component={List}/>
//         </Switch>
//       </div>
//     )
//     return (
//       <Switch>
//         <App/>
//       </Switch>
//     );
//   }
// }

// export default App;

////////////////////////////////////////

import React from 'react';
import './App.css';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import Main from './components/main';
import {Link} from 'react-router-dom';

function App() {
  return (
    {/* Uses a header that scrolls with the text, rather than staying locked at the top */},
    <div className="demo-big-content">
      <Layout>
        <Header title="test" scroll>
          <Navigation>
            <Link to="/tracking">tracking</Link>
            <Link to="/shipping">shipping</Link>
          </Navigation>
        </Header>
        <Drawer title="Title">
          <Navigation>
            <Link to="/tracking">tracking</Link>
            <Link to="/shipping">shipping</Link>
          </Navigation>
        </Drawer>
        <Content>
            <div className="page-content" />
            <Main />
            <div>
              <Switch>
                <Route exact path='/' component={tracking}/>
                <Route path='/tSummary' component={tSummary}/>
                <Route path='/tDetail' component={tDetail}/>
              </Switch>
            </div>
        </Content>
      </Layout>
    </div>
  );
}

// class App extends Component {
//   render() {
//     const App = () => (
//       <div>
//         <Switch>
//           <Route exact path='/' component={Home}/>
//           <Route path='/list' component={List}/>
//         </Switch>
//       </div>
//     )
//     return (
//       <Switch>
//         <App/>
//       </Switch>
//     );
//   }
// }

export default App;
