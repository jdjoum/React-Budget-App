// Local Storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// Delete Item
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key);
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