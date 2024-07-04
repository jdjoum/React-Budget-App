// Wait Time
export const wait = () => new Promise(res => setTimeout(res, Math.random() * 800));

// Local Storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// Delete Item
export const deleteItem = ({key}) => {
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
    const exisitingBudgetLength = fetchData('budgets')?.length ?? 0;
    return `${exisitingBudgetLength * 34} 65% 50%` 
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
    const exisitingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...exisitingBudgets, newItem]))
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
    const exisitingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...exisitingExpenses, newItem]))
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