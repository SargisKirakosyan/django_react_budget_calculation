import { useBudgets } from "../containers/BudgetsManipulation";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {
    const { expenses, budgets } = useBudgets();
    const amount = expenses.reduce(
        (total, expense) => total + expense.expense_amount,
        0
    );
    const max = budgets.reduce(
        (total, budget) => total + budget.budget_amount,
        0
    );
    if (max === 0) return null;

    return (
        <BudgetCard amount={amount} name="Total Budget" gray max={max} hideButtons />
    );
}
