import React, { Component } from 'react'
import Income from './Income'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const INCOME_QUERY = gql`
  {
    incomes {
      value
      description
    }
  }
`

class IncomeList extends Component {
  render() {

    return (
      <Query query={INCOME_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>{error.message}</div>

          const incomesToRender = data.incomes

          return (
            <div>
              {incomesToRender.map(income => <Income key={income.id} income={income} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default IncomeList