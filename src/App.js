import "./App.css";
import { Button, Stack, Container } from "react-bootstrap";
import { useBudgets } from "./Hooks/useBudget";
import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import { useEffect } from "react";

import TotalBudgetCard from "./components/TotalBudgetCard";
function App() {
  const {
    showAddBudgetModal,
    setShowAddBudgetModal,
    setShowAddExpenseModal,
    showAddExpenseModal,
    budgets,
    getAllBudgets,
    getAllExpenses,
    expenses = [],
    showTotalCard,
    isLoading,
    setisLoading,
  } = useBudgets();

  useEffect(() => {
    getAllBudgets();
    getAllExpenses();
    setisLoading(false);
  }, []);

  function getBudgetExpenses(budgetId) {
    if (expenses) {
      return expenses?.filter((expense) => expense.budgetId == budgetId);
    }
  }
  // console.log(budgets)
  const addBudgetClick = () => {
    setShowAddBudgetModal(!showAddBudgetModal);
  };

  return (
    <div className="App" style={{ style: "100vh" }}>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button
            varia
            nt="primary"
            onClick={() => {
              addBudgetClick();
            }}
          >
            Add Budget
          </Button>
        </Stack>
      </Container>
      <div
        className="d-flex flex-wrap justify-content-evenly align-items-baseline"
        style={{ style: "100vh" }}
      >
        {showAddBudgetModal && <AddBudgetModal />}

        {budgets &&
          !isLoading &&
          budgets.map((budget, index) => {
            return (
              <BudgetCard
                className="m-2"
                budget={budget}
                getBudgetExpenses={getBudgetExpenses}
                index={index}
                key={budget.id}
              />
            );
          })}
      </div>
      <div className="postion-relavtive">
        {showTotalCard && <TotalBudgetCard />}
      </div>
    </div>
  );
}

export default App;
