import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { EXPENSE_QUERY } from './ExpenseList'

const ADD_EXPENSE_MUTATION = gql`
  mutation ExpenseMutation($description: String!, $value: Int!) {
    addExpense(description: $description, value: $value) {
      id
      value
      description
    }
  }
`

class CreateExpense extends Component {
  state = {
    description: '',
    value: '',
  }

  render() {
    const { description, value } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="Expense Description"
          />
          <input
            className="mb2"
            value={value}
            onChange={e => this.setState({ value: e.target.value })}
            type="text"
            placeholder="Enter Expense Value"
          />
        </div>
        <Mutation
          mutation={ADD_EXPENSE_MUTATION}
          variables={{ description, value }}

          update={(cache, { data: { addExpense } }) => {
            const { expenses } = cache.readQuery({ query: EXPENSE_QUERY });
            cache.writeQuery({
              query: EXPENSE_QUERY,
              data: { expenses: expenses.concat([addExpense]) }
            });
          }}
        >
          {addExpenseMutation => (
            <button onClick={addExpenseMutation}>
              Add Expense
            </button>
          )}
        </Mutation>
      </div>
    )
  }
}

export default CreateExpense