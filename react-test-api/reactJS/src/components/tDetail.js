import React, { Component } from 'react';

class tDetail extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      detail: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getDetail();
  }

  // Retrieves the list of items from the Express app
  getDetail = () => {
    fetch('/api/getDetail')
    .then(res => res.json())
    .then(detail => this.setState({ detail }))
  }

  render() {
    const { detail } = this.state;

    return (
      <div className="App">
        <h1>Tracking Detail</h1>
        {/* Check to see if any items are found*/}
        {detail.length ? (
          <div>
            {/* Render the list of items */}
            {detail.map((item) => {
              return(
                <div>
                  {item}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2>No List Items Found</h2>
          </div>
        )
      }
      </div>
    );
  }
}

export default tDetail;