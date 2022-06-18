import { useState } from "react";
import Container from "react-bootstrap/Container";
import BudgetCard from "../components/BudgetCard";
import TotalBudgetCard from "../components/TotalBudgetCard";
import AddBudgetModal from "../components/AddBudgetModal";
import AddExpenseModal from "../components/AddExpenseModal";
import ExpensesListModal from "../components/ExpensesListModal";
import { useBudgets } from "./BudgetsManipulation";

export default function BudgetCalculation() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [expensesListModalBudgetId, setExpensesListModalBudgetId] =
        useState();
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
    const { budgets, getBudgetExpenses } = useBudgets();

    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true);
        setAddExpenseModalBudgetId(budgetId);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="./">
                        Simple budget calculation
                    </a>
                    <div class="row">
                        <div class="col align-self-start">
                            <button
                                class="btn btn-secondary me-2"
                                type="button"
                                onClick={() => setShowAddBudgetModal(true)}
                            >
                                Add Budget
                            </button>
                            {budgets[0] && (
                                <button
                                    class="btn btn-outline-secondary"
                                    type="button"
                                    onClick={openAddExpenseModal}
                                >
                                    Add Expense
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <Container className="my-4">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(400px, 1fr))",
                        gap: "1rem",
                        alignItems: "flex-start",
                    }}
                >
                    {budgets.map((b) => {
                        const amount = getBudgetExpenses(b.id).reduce(
                            (total, expense) => total + expense.expense_amount,
                            0
                        );

                        return (
                            <BudgetCard
                                key={b.id}
                                budgetId={b.id}
                                name={b.budget_title}
                                amount={amount}
                                max={b.budget_amount}
                                onAddExpenseClick={() =>
                                    openAddExpenseModal(b.id)
                                }
                                onViewExpensesClick={() =>
                                    setExpensesListModalBudgetId(b.id)
                                }
                            />
                        );
                    })}
                    <TotalBudgetCard />
                </div>
            </Container>
            <AddBudgetModal
                show={showAddBudgetModal}
                handleClose={() => setShowAddBudgetModal(false)}
            />
            <AddExpenseModal
                show={showAddExpenseModal}
                defaultBudgetId={addExpenseModalBudgetId}
                handleClose={() => setShowAddExpenseModal(false)}
            />
            <ExpensesListModal
                budgetId={expensesListModalBudgetId}
                defaultBudgetId={addExpenseModalBudgetId}
                handleClose={() => setExpensesListModalBudgetId()}
            />
        </>
    );
}
