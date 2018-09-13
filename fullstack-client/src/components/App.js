import React, { Component } from 'react'
import CreateIncome from './CreateIncome'
import IncomeList from './IncomeList'
import CreateExpense from './CreateExpense';
import ExpenseList from './ExpenseList';

class App extends Component {
  render() {
    return (
      <div>
        <CreateIncome />
        <IncomeList />
        <CreateExpense />
        <ExpenseList />
      </div>
    )
  }
}

export default App
