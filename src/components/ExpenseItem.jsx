import React from 'react'

// Helper Functions
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from '../helpers'

// RRD Imports
import { Link, useFetcher } from 'react-router-dom';

// Library Imports
import { TrashIcon } from '@heroicons/react/24/solid';

const ExpenseItem = ({expense}) => {
  const fetcher = useFetcher();
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      <td><Link to={`/budget/${budget.id}`} style={{"--accent": budget.color,}}>{budget.name}</Link></td>
      <td>
        <fetcher.Form className="Form" method="post">
          <input type="hidden" name="_action" value="deleteExpense"/>
          <input type="hidden" name="expenseId" value={expense.id}/>
          <button type="submit" className="btn btn--warning" aria-label={`Delete ${expense.name} expense`}>
            <TrashIcon width={20}/>
          </button>
        </fetcher.Form>
      </td>
    </>
  )
}

export default ExpenseItem