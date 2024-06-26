// RRD Imports
import { useLoaderData } from "react-router-dom";

// Library Imports
import { toast } from "react-toastify";

// Helper Functions
import { createBudget, fetchData } from "../helpers";

// Components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";

// Loader
export function dashboardLoader(){
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    return { userName, budgets }
}

// Action
export async function dashboardAction({request}){
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
}

const Dashboard = () => {
    const { userName, budgets } = useLoaderData()

    return (
        <>
           {userName ? (
            <div className="dashboard">
                <h1>Welcome back, <span className="accent">{userName}</span></h1>
                <div className="grid-sm">
                    {}
                    <div className="grid-lg">
                        <div className="flex-lg">
                            <AddBudgetForm/>
                        </div>
                    </div>
                </div>
            </div>

           ) : <Intro />}
        </>
    )
}

export default Dashboard;