import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { INCOME_QUERY } from './IncomeList'

const ADD_INCOME_MUTATION = gql`
  mutation IncomeMutation($description: String!, $value: Int!) {
    addIncome(description: $description, value: $value) {
      id
      value
      description
    }
  }
`

class CreateIncome extends Component {
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
            placeholder="Income Description"
          />
          <input
            className="mb2"
            value={value}
            onChange={e => this.setState({ value: e.target.value })}
            type="text"
            placeholder="Enter Income Value"
          />
        </div>
        <Mutation
          mutation={ADD_INCOME_MUTATION}
          variables={{ description, value }}

          update={(cache, { data: { addIncome } }) => {
            const { incomes } = cache.readQuery({ query: INCOME_QUERY });
            cache.writeQuery({
              query: INCOME_QUERY,
              data: { incomes: incomes.concat([addIncome]) }
            });
          }}
        >
          {addIncomeMutation => (
            <button onClick={addIncomeMutation}>
              Add Income
            </button>
          )}
        </Mutation>
      </div>
    )
  }
}

export default CreateIncome