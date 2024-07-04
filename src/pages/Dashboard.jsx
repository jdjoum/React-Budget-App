// RRD Imports
import { useLoaderData } from "react-router-dom";

// Library Imports
import { toast } from "react-toastify";

// Helper Functions
import { createBudget, createExpense, fetchData, wait } from "../helpers";

// Components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// Loader
export function dashboardLoader(){
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return { userName, budgets, expenses }
}

// Action
export async function dashboardAction({request}){
    await wait()
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

    // New User Submission
    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success(`Welcome, ${values.userName}`)
        } catch(e) {
            throw new Error("There was a problem creating your account.")
        }
    }
    // Create Budget
    if (_action === "createBudget") {
        try {
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount,
            })
            return toast.success("Budget created!")
        } catch(e) {
            throw new Error("There was a problem creating your budget.")
        }
    }
    // Create Expense
    if (_action === "createExpense") {
        try {
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget

            })
            return toast.success(`Expense ${values.newExpense} created!`)
        } catch(e) {
            throw new Error("There was a problem creating your expense.")
        }
    }
}

const Dashboard = () => {
    const { userName, budgets, expenses } = useLoaderData()

    return (
        <>
           {userName ? (
            <div className="dashboard">
                <h1>Welcome back, <span className="accent">{userName}</span></h1>
                <div className="grid-sm">
                    {
                        budgets && budgets.length > 0 ? (
                            <div className="grid-lg">
                                <div className="flex-lg">
                                    <AddBudgetForm/>
                                    <AddExpenseForm budgets={budgets} />
                                </div>
                                <h2>Existing Budgets</h2>
                                <div className="budgets">
                                    {
                                        budgets.map((budget) => (
                                          <BudgetItem key={budget.id} budget={budget} /> 
                                        ))
                                    }
                                </div>
                                {
                                    expenses && expenses.length > 0 && (
                                        <div className="grid-md">
                                            <h2>Recent Expenses</h2>
                                            <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)}/>
                                        </div>
                                    )
                                }
                            </div>) : (
                            <div className="grid-sm">
                                <p>Personal budgeting is the secret to financial freedom.</p>
                                <p>Create a budget to get started!</p>
                                <AddBudgetForm />
                            </div>
                        )
                    }
                </div>
            </div>

           ) : <Intro />}
        </>
    )
}

export default Dashboard;