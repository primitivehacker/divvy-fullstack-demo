import React, { Component } from 'react'

class Income extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.income.description} {this.props.income.value}
        </div>
      </div>
    )
  }
}

export default Income