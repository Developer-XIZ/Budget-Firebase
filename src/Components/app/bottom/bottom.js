import React from 'react';
import Adder from './adder';
import BudgetArchive from './budget-archive';
import "./bottom.css";

const Bottom = ({budgets , AddBudgetItem , Income , DeleteItem}) => {
    return (
        <div className="bottom">
            <Adder AddBudgetItem={AddBudgetItem} />
            <BudgetArchive budgets={budgets} Income={Income} DeleteItem={DeleteItem} />
        </div>
    )
}

export default Bottom;