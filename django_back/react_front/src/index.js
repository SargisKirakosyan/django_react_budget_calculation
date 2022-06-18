import React from "react";
import ReactDOM from "react-dom/client";
import BudgetCalculation from "./containers/BudgetCalculation";
import { BudgetsProvider } from "./containers/BudgetsManipulation";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BudgetsProvider>
            <BudgetCalculation />
        </BudgetsProvider>
    </React.StrictMode>
);