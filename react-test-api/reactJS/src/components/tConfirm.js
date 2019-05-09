import React, { Component } from 'react';

class tConfirm extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      confirm: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getConfirm();
  }

  // Retrieves the list of items from the Express app
  getConfirm = () => {
    fetch('/api/getConfirm')
    .then(res => res.json())
    .then(confirm => this.setState({ confirm }))
  }

  render() {
    const { confirm } = this.state;

    return (
      <div className="App">
        <h1>Tracking Confirmation</h1>
        {/* Check to see if any items are found*/}
        {confirm.length ? (
          <div>
            {/* Render the list of items */}
            {confirm.map((item) => {
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

export default tConfirm;