// RRD Imports
import { useLoaderData } from "react-router-dom";

// Library Imports
import { toast } from "react-toastify";

// Helper Functions
import { fetchData } from "../helpers";

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
    const formData = Object.fromEntries(data);
    try {
        localStorage.setItem("userName", JSON.stringify(formData.userName))
        return toast.success(`Welcome, ${formData.userName}`)
    } catch(e) {
        throw new Error("There was a problem creating your account.")
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