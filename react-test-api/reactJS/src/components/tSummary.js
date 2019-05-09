import React, { Component } from 'react';

class tSummary extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      summary: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getSummary();
  }

  // Retrieves the list of items from the Express app
  getSummary = () => {
    fetch('/api/getSummary')
    .then(res => res.json())
    .then(summary => this.setState({ summary }))
  }

  render() {
    const { summary } = this.state;

    return (
      <div className="App">
        <h1>Tracking Summary</h1>
        {/* Check to see if any items are found*/}
        {summary.length ? (
          <div>
            {/* Render the list of items */}
            {summary.map((item) => {
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

export default tSummary;