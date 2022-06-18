import { Modal, Button, Stack } from "react-bootstrap";
import { useBudgets } from "../containers/BudgetsManipulation";
import { currencyFormatter } from "../helpers/currencyFormatter";

export default function ExpensesListModal({ budgetId, handleClose }) {
    const { getBudgetExpenses, budgets, deleteExpense } = useBudgets();

    const expenses = getBudgetExpenses(budgetId);

    const budget = budgets.find((b) => b.id === budgetId);

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        <div>Expenses - {budget?.budget_title}</div>
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap="3">
                    {expenses.map((e) => (
                        <Stack direction="horizontal" gap="2" key={e.id}>
                            <div className="me-auto fs-4">
                                {e.expense_title}
                            </div>
                            <div className="fs-5">
                                {currencyFormatter.format(e.expense_amount)}
                            </div>
                            <Button
                                onClick={() => deleteExpense(e)}
                                size="sm"
                                variant="outline-danger"
                            >
                                &times;
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    );
}
