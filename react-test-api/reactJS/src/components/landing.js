import React, {Component} from 'react';
import { Layout, Button, Card, CardTitle, CardText, CardActions, CardMenu, IconButton } from 'react-mdl';
import {Link} from 'react-router-dom';

function landing() {
	return (
		<div><h1>landing</h1>
			<Layout>
				<Card shadow={0} style={{width: '512px', margin: 'auto'}}>
		          <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>Check Tracking</CardTitle>
		          <CardText>
		              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		              Mauris sagittis pellentesque lacus eleifend lacinia...
		          </CardText>
		          <CardActions border>
		              <Button colored><Link to="/tracking">tracking</Link></Button>
		          </CardActions>
		          <CardMenu style={{color: '#fff'}}>
		              <IconButton name="share" />
		          </CardMenu>
		        </Card>
		        <Card shadow={0} style={{width: '512px', height: '320px', margin: 'auto'}}>
				    <CardTitle expand style={{color: '#fff', background: 'url(http://www.getmdl.io/assets/demos/dog.png) bottom right 15% no-repeat #46B6AC'}}>Check Shipping</CardTitle>
				    <CardText>
				        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				        Aenan convallis.
				    </CardText>
				    <CardActions border>
				        <Button colored><Link to="/shipping">shipping</Link></Button>
				    </CardActions>
				</Card>
		    </Layout>
		</div>
	);
}

export default landing;