import React from 'react';
import BudgetItem from './budgetItem';
import "./budgetArchive.css";

let BudgetArchive = ({budgets , Income , DeleteItem}) => {
    return (
        <div id="Budget-archive">
            <div className="Income">
                <h2 className="Income-title">Income</h2>
                <div className="Income-list">
                    <BudgetItem Budget={budgets.Income} type={"+ "} Income={Income} DeleteItem={DeleteItem} />
                </div>
            </div>
            <div className="Expenses">
                <h2 className="Expenses-title">Expenses</h2>
                <div className="Expenses-list">
                    <BudgetItem Budget={budgets.Expenses} type={"- "} Income={Income} DeleteItem={DeleteItem} />
                </div>
            </div>
        </div>
    )
}

export default BudgetArchive;