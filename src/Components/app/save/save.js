import React from "react";
import "./save.css";

const Save = ({Save , budgets , localId , classname}) => {
    return (
        <button id="Save" className={classname} onClick={() => {
            Save(budgets.Income , budgets.Expenses , localId)
        }}>
            <div id="hidden">
                Save
            </div>           
        </button>
    )
}

export default Save;