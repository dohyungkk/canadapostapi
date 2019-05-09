import React from 'react';
import {Switch, Route} from 'react-router-dom';
import landing from './landing';
import tracking from './tracking';
import shipping from './shipping';

const Main = () => (
	<Switch>
		<Route exact path="/" component={landing} />
		<Route path="/tracking" component={tracking} />
		<Route path="/shipping" component={shipping} />
	</Switch>
)

export default Main;