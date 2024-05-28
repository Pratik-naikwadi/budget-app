import React, { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";

const BudgetContext = React.createContext();

//post request for adding expense
async function addExpense({ description, amount, budgetId, date }) {
  const response = await axios.post("http://localhost:3004/expenses", {
    description: description,
    amount: amount,
    budgetId: budgetId,
    date: date,
  });

  return response?.data || [];
}

// post request for adding new Budget
function addBudget({ budgetName, maxAmount }) {
  axios
    .post("http://localhost:3004/budgets", {
      budgetName: budgetName,
      maxAmount: maxAmount,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

const BudgetProvider = ({ children }) => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [budgets, setBudgets] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [showViewExpenses, setShowViewExpenses] = useState(false);

  const [viewExpenseBudgetId, setViewExpenseBudgetId] = useState();
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState();
  const [oneExpense, setOneExpense] = useState();
  const [showTotalCard, setShowTotalCard] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [thisBudget, setThisBudget] = useState();

  async function getAllExpenses() {
    try {
      const response = await axios.get("http://localhost:3004/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const findBudgetName = (budgetId) => {
    const budget = budgets.filter((bud) => {
      return bud.id === budgetId;
    });

    const budgetName = budget[0]?.budgetName;
    // console.log(budgetName)
    return budgetName ? budgetName : null;
  };

  async function getOneExpense(id) {
    try {
      const response = await axios.get(`http://localhost:3004/expenses/${id}`);
      setOneExpense(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getAllBudgets() {
    // console.log("getAllBudgets called");
    try {
      const response = await axios.get("http://localhost:3004/budgets");
      setBudgets(response.data);
      console.log(response.data);
      if (response.data.length == 0) {
        setShowTotalCard(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteBudget(budgetId) {
    const confirm = window.confirm("Are you sure you want to delete budget");
    if (confirm) {
      await axios.delete(`http://localhost:3004/budgets/${budgetId}`);
      console.log("budget deleted ");
    }
    getAllBudgets();
    getAllExpenses();
  }

  async function deleteExpense(expenseId) {
    const confirm = window.confirm("Are you sure you want to delete expense");
    if (confirm) {
      await axios.delete(`http://localhost:3004/expenses/${expenseId}`);
      console.log("expense deleted ", expenseId);
    }
    getAllBudgets();
    getAllExpenses();
  }

  const editExpense = async (id, { description, amount, budgetId, date }) => {
    const res = await axios({
      method: "put",
      url: `http://localhost:3004/expenses/${id}`,
      data: {
        description: description,
        amount: amount,
        budgetId: budgetId,
        date: date,
      },
    });
    console.log("edited");

    return res;
  };

  return (
    <BudgetContext.Provider
      value={{
        addBudget,
        showAddBudgetModal,
        setShowAddBudgetModal,
        getAllBudgets,
        budgets,
        addExpense,
        expenses,
        setExpenses,
        showAddExpenseModal,
        setShowAddExpenseModal,
        addExpenseModalBudgetId,
        setAddExpenseModalBudgetId,
        getAllExpenses,
        setShowViewExpenses,
        showViewExpenses,
        viewExpenseBudgetId,
        setViewExpenseBudgetId,
        addExpenseBudgetId,
        setAddExpenseBudgetId,
        deleteBudget,
        deleteExpense,
        editExpense,
        getOneExpense,
        oneExpense,
        setOneExpense,
        showTotalCard,
        setShowTotalCard,
        isLoading,
        setisLoading,
        setThisBudget,
        thisBudget,
        findBudgetName,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export { BudgetProvider, BudgetContext };
