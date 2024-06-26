// rrd imports
import { redirectDocument } from "react-router-dom";

// helpers
import { deleteItem } from "../helpers";

export async function logoutAction(){
    // delete the user
    deleteItem({
        key: "userName"
    })
    // return redirect
    return redirectDocument("/")
}