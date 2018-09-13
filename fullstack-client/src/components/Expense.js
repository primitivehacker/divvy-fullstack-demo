import React, { Component } from 'react'



class Expense extends Component {
  state = {
    description: '',
    value: '',
  }
  render() {
    const { description, value } = this.state
    return (
      <div>
        <div>
          {this.props.expense.description} {this.props.expense.value}
        </div>
      </div>

    )
  }
}
export default Expense