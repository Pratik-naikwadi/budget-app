import { Card, ProgressBar } from "react-bootstrap";
import AddExpenseModal from "./AddExpenseModal";
import { Stack, Button, OverlayTrigger } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import { useEffect } from "react";
import { useBudgets } from "../Hooks/useBudget";
import ViewExpensesModal from "./ViewExpensesModal";

const BudgetCard = ({ budget, getBudgetExpenses }) => {
  const { budgetName, maxAmount } = budget;

  const bud = getBudgetExpenses(budget.id).reduce(
    (total, expense) => total + parseInt(expense.amount),
    0
  );
  const amount = bud;

  const classNames = [];
  const {
    setShowAddExpenseModal,
    showAddExpenseModal,
    showViewExpenses,
    setShowViewExpenses,
    viewExpenseBudgetId,
    setViewExpenseBudgetId,
    addExpenseBudgetId,
    setAddExpenseBudgetId,
    deleteBudget,
    setShowTotalCard,
    getAllBudgets,
    getAllExpenses,
  } = useBudgets();

  useEffect(() => {
    setShowTotalCard(true);
  }, []);

  const addExpenseClick = () => {
    setShowAddExpenseModal(!showAddExpenseModal);
    setAddExpenseBudgetId(budget.id);
  };

  const viewExpensesClick = () => {
    setShowViewExpenses(!showViewExpenses);
    setViewExpenseBudgetId(budget.id);
  };

  const deleteBudgetHandler = () => {
    deleteBudget(budget.id);

    getAllExpenses();
    getAllBudgets();
  };

  if (amount > budget.maxAmount) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else {
    classNames.push("bg-light");
  }

  const tooltipContent = () => {
    const ratio = amount / budget.maxAmount;
    if (ratio < 0.5) return "hooray..!! our expense is in budget";
    if (ratio < 0.75) return "alert..!! watch your budget";
    return "oops..!! we are over budget now";
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {tooltipContent()}
    </Tooltip>
  );
  return (
    <>
      <Card
        className={`${classNames.join(" ")} d-flex w- mt-4`}
        style={{ width: "28rem" }}
      >
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
            <div
              className="me-2"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {budgetName}
            </div>
            <div>
              {amount}
              <span className="text-muted fs-6 ms-1">/ {maxAmount}</span>
            </div>
            {amount > budget.maxAmount && (
              <div className="text-danger h6 ">
                you are going over Budget...!!
              </div>
            )}
          </Card.Title>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <ProgressBar
              className="rounded-pill"
              variant={getProgressBarVariant(amount, budget.maxAmount)}
              min={0}
              max={budget.maxAmount}
              now={amount}
            />
          </OverlayTrigger>
          <Stack direction="horizontal" gap="2" className="mt-4 m-auto p-auto ">
            <Button
              variant="outline-primary"
              className="me-auto"
              onClick={() => addExpenseClick()}
            >
              Add expense
            </Button>
            <Button
              variant="outline-secondary"
              className="me-auto"
              onClick={viewExpensesClick}
            >
              view expense
            </Button>
            <Button
              variant="outline-danger
          "
              onClick={deleteBudgetHandler}
            >
              delete
            </Button>
          </Stack>
        </Card.Body>
      </Card>
      {showAddExpenseModal && (
        <AddExpenseModal
          budget={budget}
          getBudgetExpenses={getBudgetExpenses}
          addExpenseBudgetId={addExpenseBudgetId}
        />
      )}
      {showViewExpenses && (
        <ViewExpensesModal viewExpenseBudgetId={viewExpenseBudgetId} />
      )}
    </>
  );
};

function getProgressBarVariant(amount, max) {
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
}

export default BudgetCard;
