import React, { useContext, useEffect, useState } from "react";
import axios from "axios";


const BudgetsContext = React.createContext();

export function useBudgets() {
    return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        refreshBudgetList();
        refreshExpenseList();
    }, []);

    const refreshBudgetList = () => {
        axios
            .get("http://localhost:8000/api/budgets/")
            .then((res) => setBudgets(res.data))
            .catch((err) => console.log(err));
    };

    const refreshExpenseList = () => {
        axios
            .get("http://localhost:8000/api/expenses/")
            .then((res) => setExpenses(res.data))
            .catch((err) => console.log(err));
    };

    function getBudgetExpenses(budgetId) {
        return expenses.filter((expense) => expense.expense_budget_id === budgetId);
    }

    function addExpense(expensesInfo) {
        axios
            .post("http://localhost:8000/api/expenses/", expensesInfo)
            .then((res) => refreshExpenseList());
    }

    function addBudget(budgetInfo) {
        axios
            .post("http://localhost:8000/api/budgets/", budgetInfo)
            .then((res) => refreshBudgetList());
    }

    function deleteBudget({ id }) {
        axios
            .delete(`http://localhost:8000/api/budgets/${id}/`)
            .then((res) => refreshBudgetList());
    }

    function deleteExpense({ id }) {
        axios
        .delete(`http://localhost:8000/api/expenses/${id}/`)
        .then((res) => refreshExpenseList());
    }

    return (
        <BudgetsContext.Provider
            value={{
                budgets,
                expenses,
                getBudgetExpenses,
                addExpense,
                addBudget,
                deleteBudget,
                deleteExpense,
            }}
        >
            {children}
        </BudgetsContext.Provider>
    );
};
