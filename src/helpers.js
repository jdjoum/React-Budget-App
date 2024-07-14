// Wait Time
export const wait = () => new Promise(res => setTimeout(res, Math.random() * 800));

// Local Storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// Get All Items From Local Storage
export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value);
}

// Delete Item
// export const deleteItem = ({key}) => {
//     return localStorage.removeItem(key);
// }

// Delete Item
export const deleteItem = ({key, id}) => {
    const existingData = fetchData(key);
    if(id){
        const newData = existingData.filter((item) => item.id !== id)
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}

// Total Spent By Budget
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc ,expense) => {
        // Check if expense.id === budgetId I passed in
        if(expense.budgetId !== budgetId) return acc
        // Add the current amount to my total
        return acc += expense.amount
    }, 0)
    return budgetSpent;
}

// Generate Random Color
const generateRandomColor = () => {
    const existingBudgetLength = fetchData('budgets')?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%` 
}

// Create Budget
export const createBudget = ({
    name, amount
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}

// Create Expense
export const createExpense = ({
    name, amount, budgetId
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}

// Formatting

// Format Date
export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

// Format Currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    })
}

// Format Percentage
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    })
}