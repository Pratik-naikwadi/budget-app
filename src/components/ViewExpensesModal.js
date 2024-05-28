import { Modal, Button, Stack, Row } from "react-bootstrap";
import { useBudgets } from "../Hooks/useBudget";

export default function ViewExpensesModal({ viewExpenseBudgetId }) {
  const {
    budgets,
    showAddExpenseModal,
    setShowAddExpenseModal,
    showViewExpenses,
    setShowViewExpenses,
    expenses,
    deleteExpense,
    getOneExpense,
    getAllExpenses,
    getAllBudgets,
  } = useBudgets();

  const budget = budgets.filter((bud) => {
    return bud.id === viewExpenseBudgetId;
  });

  const budgetName = budget[0].budgetName;
  const thisBudgetExpense = () => {
    return expenses.filter((value) => {
      return value.budgetId == viewExpenseBudgetId;
    });
  };

  const expenseEditClick = (expenseId) => {
    getOneExpense(expenseId);
    setShowAddExpenseModal(!showAddExpenseModal);
    getAllExpenses();
    getAllBudgets();
  };

  const expenseDeleteClick = (expenseId) => {
    deleteExpense(expenseId);
    getAllBudgets();
    getAllExpenses();
  };

  const budgetExpense = thisBudgetExpense();

  return (
    <>
      <Modal
        show={showViewExpenses}
        onHide={() => setShowViewExpenses(!showViewExpenses)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Stack direction="horizontal" gap="2">
              <div>expenses -{budgetName}</div>
            </Stack>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Stack direction="vertical" gap="3">
            {budgetExpense.map((exp, index) => {
              let fullDate = new Date(exp.date);
              let date =
                fullDate.toLocaleDateString() +
                " " +
                fullDate.toLocaleTimeString();
              return (
                <Row
                  className="align-items-start"
                  direction="horizontal"
                  gap="2"
                  key={exp.id}
                >
                  <div className="col-md-6">{exp.description}</div>
                  <div className="date col-md-3">{date}</div>
                  <div className="col-md-1">{exp.amount}</div>
                  <div className="col-md-2 d-flex align-items-center justify-content-around">
                    <Button
                      className="mr-2"
                      size="sm"
                      onClick={() => expenseEditClick(exp.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="11"
                        fill="currentColor"
                        className="bi bi-pencil-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                      </svg>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => expenseDeleteClick(exp.id)}
                    >
                      &times;
                    </Button>
                  </div>
                </Row>
              );
            })}
          </Stack>
        </Modal.Body>
      </Modal>
    </>
  );
}
