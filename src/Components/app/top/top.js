import React from 'react';
import Hoc from '../../hoc';
import "./top.css";

const Top = ({Budget}) => {
    const {BigNumbers} = Hoc;
    return (
        <div className="top">
            <div className="Budget-form-info">
                <div id="Date-Time">
                    Available Budget in <span className="Date-Time">{Month()}</span>
                </div>
                <h1 id="Budget-calculator">{`${Budget.type} ${BigNumbers("parse" , Budget.value)}`}</h1>
                <div id="Budget-all-changes">
                    <div id="Budget-type-income" className="type-changes">
                        <div className="type-changes-name">Income</div>
                        <div className="type-changes-value">
                            <div className="value-percentage">{Budget.IncPercentage}</div>
                            <div className="value-number">{`+ ${BigNumbers("parse" , Budget.Income)}`}</div>
                        </div>
                    </div>
                    <div id="Budget-type-expenses" className="type-changes">
                        <div className="type-changes-name">Expenses</div>
                        <div className="type-changes-value">
                            <div className="value-percentage">{Budget.ExpPercentage}</div>
                            <div className="value-number">{`- ${BigNumbers("parse" , Budget.Expenses)}`}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Month = () => {
    let now , year , month , months;
    now = new Date();
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    month = months[now.getMonth()];
    year = now.getFullYear();
    return month + ' ' + year;
};

export default Top;