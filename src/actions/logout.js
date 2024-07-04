// rrd imports
import { redirect } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// helpers
import { deleteItem } from "../helpers";

export async function logoutAction(){
    // delete the user
    deleteItem({
        key: "userName"
    })
    // delete the budgets
    deleteItem({
        key: "budgets"
    })
    // delete the expenses
    deleteItem({
        key: "expenses"
    })
    toast.success("You've deleted your account!")
    // return redirect
    return redirect("/")
}