import { useContext } from "react";
import { BudgetContext } from "../Context/BudgetContext";

export function useBudgets() {
  return useContext(BudgetContext);
}
