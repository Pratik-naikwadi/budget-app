import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useBudgets } from "../Hooks/useBudget";

const AddExpenseModal = ({ addExpenseBudgetId, budget }) => {
  const [thisDate, setThisDate] = useState();

  useEffect(() => {
    const date = new Date();
    setThisDate(date.toISOString().slice(0, 16));
  }, []);

  console.log(thisDate);

  console.log(budget);
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const dateRef = useRef();

  const {
    addExpense,
    budgets,
    showAddExpenseModal,
    setShowAddExpenseModal,
    oneExpense,
    setOneExpense,
    editExpense,
    getAllBudgets,
    getAllExpenses,
  } = useBudgets();

  const thisBudget = !oneExpense
    ? budgets.filter((b) => b.id == addExpenseBudgetId)
    : null;

  const thisBudgetName = !oneExpense ? thisBudget[0]?.budgetName : null;

  const oneExpenseBudget = oneExpense
    ? budgets.filter((b) => b.id == oneExpense.budgetId)
    : null;

  const onExpenseBudgetName = oneExpense
    ? oneExpenseBudget[0].budgetName
    : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const description = descriptionRef.current.value;
    const amount = amountRef.current.value;
    const budgetId = budgetIdRef.current.value;
    const date = dateRef.current.value;

    addExpense({
      description: description,
      amount: amount,
      budgetId: budgetId,
      date: date,
    })
      .then((response) => {
        setShowAddExpenseModal(!showAddExpenseModal);
        getAllBudgets();
        getAllExpenses();
      })
      .catch((err) => console.log("err - ", err));
  };

  const editExpenseClickHandler = () => {
    const description = descriptionRef.current.value;
    const amount = amountRef.current.value;
    const budgetId = budgetIdRef.current.value;
    const date = dateRef.current.value;

    editExpense(oneExpense.id, {
      description: description,
      amount: amount,
      budgetId: budgetId,
      date: date,
    })
      .then((response) => {
        setShowAddExpenseModal(!showAddExpenseModal);
        setOneExpense(null);
        setShowAddExpenseModal(!showAddExpenseModal);
        getAllExpenses();
        getAllBudgets();
      })
      .catch((err) => console.log("err - ", err));
  };

  return (
    <Modal
      show={true}
      onHide={() => {
        setShowAddExpenseModal(!showAddExpenseModal);
        setOneExpense(null);
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            Expense-{thisBudgetName || onExpenseBudgetName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="description">
            <Form.Label>description</Form.Label>
            <Form.Control
              ref={descriptionRef}
              type="text"
              defaultValue={oneExpense ? oneExpense.description : null}
              required
            />
          </Form.Group>
          <Form.Group controlId="amount">
            <Form.Label>amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              defaultValue={oneExpense ? oneExpense.amount : null}
              required
              min={0}
              step={0.01}
            />
          </Form.Group>

          <Form.Group controlId="budgetId">
            <Form.Label>budget</Form.Label>
            <Form.Select
              defaultValue={oneExpense ? oneExpense.budgetId : null}
              ref={budgetIdRef}
            >
              {!oneExpense ? (
                <option value={addExpenseBudgetId}>{thisBudgetName}</option>
              ) : (
                <option value={oneExpense.budgetId}>
                  {onExpenseBudgetName}
                </option>
              )}
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.budgetName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>date</Form.Label>
            <Form.Control
              type="datetime-local"
              defaultValue={oneExpense ? oneExpense.date : thisDate}
              data-date-format="DD MMMM YYYY"
              ref={dateRef}
            />
          </Form.Group>
          <div className="d-flex justify-content-end mt-3">
            {!oneExpense && (
              <Button variant="primary" type="submit">
                add
              </Button>
            )}
            {oneExpense && (
              <Button
                variant="primary"
                onClick={oneExpense ? editExpenseClickHandler : null}
              >
                edit
              </Button>
            )}
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddExpenseModal;
