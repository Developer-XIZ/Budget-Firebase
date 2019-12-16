import React from 'react';
import Mathz from '../../../../hoc';
import "./budgetItem.css";

let BudgetItem = ({Budget , type , Income , DeleteItem}) => {
    const BudgetType = type === "+ " ? "Income" : "Expenses";
    const items = Budget.map((item , index) => {
        return (
            <div key={index} className="item">
                <div className="item-description">{item.name}</div>
                <div className="item-changes">
                    <button className="item-delete-button" onClick={() => DeleteItem(BudgetType, index)}> 
                        <i className="fa fa-times-circle-o" aria-hidden="true"></i>
                    </button>
                    <div className="item-percentage">{Mathz.BudgetItemPercentage(Income , item.value)}</div>
                    <div className="item-value">{type + Mathz.BigNumbers("parse" , (item.value).toString())}</div>
                </div>
            </div>
    )});
    return (
        <React.Fragment>
            {items}
        </React.Fragment>
    )
}

export default BudgetItem;