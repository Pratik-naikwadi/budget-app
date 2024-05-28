import { Modal, Button, Form } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../Hooks/useBudget";

const AddBudgetModal = () => {
  const {
    showAddBudgetModal,
    setShowAddBudgetModal,
    addBudget,
    getAllExpenses,
    getAllBudgets,
  } = useBudgets();
  const nameRef = useRef();
  const maxRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const budgetName = nameRef.current.value;
    const maxAmount = maxRef.current.value;
    addBudget({ budgetName, maxAmount });
    setShowAddBudgetModal(!showAddBudgetModal);
    getAllExpenses();
    getAllBudgets();
  };

  return (
    <Modal
      show="true"
      onHide={() => setShowAddBudgetModal(!showAddBudgetModal)}
    >
      <Form onSubmit={submitHandler}>
        <Modal.Header closeButton>
          <Modal.Title>New budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>maximum spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddBudgetModal;
