import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../helpers/currencyFormatter";
import { useBudgets } from "../containers/BudgetsManipulation";


export default function BudgetCard({
    budgetId,
    name,
    amount,
    max,
    gray,
    hideButtons,
    onAddExpenseClick,
    onViewExpensesClick,
}) {
    const classNames = [];
    if (amount > max) {
        classNames.push("bg-danger", "bg-opacity-10");
    } else if (gray) {
        classNames.push("bg-light");
    }
    const {getBudgetExpenses, deleteBudget, budgets} = useBudgets();

    const budget = budgets.find((b) => b.id === budgetId);

    return (
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title
                    className="d-flex justify-content-between
                align-items-baseline fw-normal mb-3"
                >
                    <div className="me-2">{name}</div>
                    <div className="d-flex align-items-baseline">
                        {currencyFormatter.format(amount)}
                        {max && (
                            <span className="text-muted fs-6 m-1">
                                / {currencyFormatter.format(max)}
                            </span>
                        )}
                    </div>
                </Card.Title>
                {max && (
                    <ProgressBar
                        className="rounded-pill"
                        variant={getProgressBarVariant(amount, max)}
                        min={0}
                        max={max}
                        now={amount}
                    />
                )}
                {!hideButtons && (
                    <Stack direction="horizontal" gap="3" className="mt-4">
                        <Button
                            onClick={() => {
                                deleteBudget(budget);
                            }}
                            variant="outline-danger"
                            className="ms-auto"
                            size="sm"
                        >
                            Delete Budget
                        </Button>
                        <Button
                            variant="outline-primary"
                            onClick={onAddExpenseClick}
                            size="sm"
                        >
                            Add Expense
                        </Button>
                        {getBudgetExpenses(budgetId) && (
                            <Button
                                onClick={onViewExpensesClick}
                                variant="outline-secondary"
                                size="sm"
                            >
                                View Expense
                            </Button>
                        )}
                    </Stack>
                )}
            </Card.Body>
        </Card>
    );
}

function getProgressBarVariant(amount, max) {
    const ratio = amount / max;
    if (ratio < 0.5) return "primary";
    if (ratio < 0.75) return "warning";
    return "danger";
}
