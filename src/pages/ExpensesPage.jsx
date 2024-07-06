import React from 'react'

// RRD Imports
import { useLoaderData } from 'react-router-dom';

// Components
import Table from '../components/Table';

// Helper Functions
import { deleteItem, fetchData } from '../helpers';

// Library Import
import { toast } from 'react-toastify';

// Loader
export async function expensesLoader(){
    const expenses = fetchData("expenses");
    return { expenses }
}

// Action 
export async function expensesAction({request}) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

    // Delete Expense
    if (_action === "deleteExpense") {
        try {
            deleteItem({
                key: "expenses",
                id: values.expenseId
            })
            return toast.success("Expense deleted!")
        } catch(e) {
            throw new Error("There was a problem deleting your expense.")
        }
    }
}

const ExpensesPage = () => {
    const { expenses } = useLoaderData()
    return <div className="grid-lg">
        <h1>All Expenses</h1>
        {
            expenses && expenses.length > 0 ? (
                <div className="grid-md">
                    <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                    <Table expenses={expenses} />
                </div>
            ) : <p> No expenses to show</p>
        }
    </div>
}

export default ExpensesPage