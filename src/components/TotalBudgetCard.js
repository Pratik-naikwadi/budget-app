import { useBudgets } from "../Hooks/useBudget";
import { Card, ProgressBar } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();

  const [amount, setAmount] = useState();
  const [max, setMax] = useState();

  useEffect(() => {
    setAmount(
      expenses.reduce((total, expense) => total + parseInt(expense.amount), 0)
    );
    setMax(
      budgets.reduce((total, budget) => total + parseInt(budget.maxAmount), 0)
    );
  }, [budgets, expenses]);

  function getProgressBarVariant(amount, max) {
    const ratio = amount / max;
    if (ratio < 0.5) return "primary";
    if (ratio < 0.75) return "warning";
    return "danger";
  }

  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else {
    classNames.push("bg-light");
  }

  return (
    <Card
      className={`${classNames.join(
        " "
      )} w-50 position-absolute bottom-0 start-50 translate-middle-x mb-4 `}
    >
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">Total</div>
          <div className="d-flex align-items-baseline">
            {amount}
            <span className="text-muted fs-6 ms-1">/ {max}</span>
          </div>
        </Card.Title>
        <ProgressBar
          className="rounded-pill"
          variant={getProgressBarVariant(amount, max)}
          min={0}
          max={max}
          now={amount}
        />
      </Card.Body>
    </Card>
  );
}
