// Library Imports
import { toast } from "react-toastify";
// Helper Functions
import { deleteItem, getAllMatchingItems } from "../helpers";
// RRD Imports
import { redirect } from "react-router-dom";

export function deleteBudget({params}) {
    try {
        // Delete Budget
        deleteItem({
            key: "budgets",
            id: params.id
        })
        // Find each expense associated to a budget and delete
        const associatedExpenses = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id,
        })
        associatedExpenses.forEach((expense) => {
            deleteItem({
                key: "expenses",
                id: expense.id
            })
        })

        toast.success("Budget deleted successfully!");
    } catch(e) {
        throw new Error("There was a problem deleting your budget.")
    }
    return redirect("/")
}