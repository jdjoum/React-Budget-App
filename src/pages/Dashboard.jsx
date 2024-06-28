// RRD Imports
import { useLoaderData } from "react-router-dom";

// Library Imports
import { toast } from "react-toastify";

// Helper Functions
import { fetchData } from "../helpers";

// Components
import Intro from "../components/Intro";

// Loader
export function dashboardLoader(){
    const userName = fetchData("userName");
    return { userName }
}

// Actionn
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
    const { userName } = useLoaderData()

    return (
        <>
           {userName ? (<p>{userName}</p>) : <Intro />}
        </>
    )
}

export default Dashboard;