import React, { Component } from 'react'
import Expense from './Expense'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const EXPENSE_QUERY = gql`
  {
    expenses {
      value
      description
    }
  }
`

class ExpenseList extends Component {
  render() {

    return (
      <Query query={EXPENSE_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>{error.message}</div>

          const expensesToRender = data.expenses

          return (
            <div>
              {expensesToRender.map(expense => <Expense key={expense.id} expense={expense} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default ExpenseList