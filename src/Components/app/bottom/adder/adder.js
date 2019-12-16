import React , {Component} from 'react';
import "./adder.css";

export default class Adder extends Component{
    state = {
        valuetype: "inc"
    };

    typeSelect = (e) => {
        const valuetype = e.target.value;
        this.setState(() => {
            return {valuetype}
        })

    }

    NotKeys = (e) => {
        let NotKeys = '+-e' ;
        if (NotKeys.indexOf(e.key) !== -1)
        {
            e.preventDefault();
        }
    }

    KeyPressed = (e) => {
        if (e.key === "Enter") 
        {this.AddNewItem(e)}
    }

    AddNewItem = (e) => {
        const {valuetype} = this.state;
        let Elements = undefined;
        if(e.target.parentNode.id === "Add-budget-container")
        {
            Elements = e.target.parentNode.children;
        }
        else {
            Elements = e.target.parentNode.parentNode.children;
        }
        
        let [, name , value] = Elements;
        name = name.value; value = value.value;
        if (name !== "" && value !== "")
        {
            value = parseFloat((parseFloat(value)).toFixed(2));
            const NewItem = {name , value};
            this.props.AddBudgetItem(valuetype , NewItem);
            this.setState(() => {
                return {valuetype}
            })
            Elements[1].value = "";
            Elements[2].value = "";
            Elements[1].focus();
        }
        else {
            for(let i = 0 ; i < 2 ; i++) {
                if(Elements[i + 1].value === "") {
                    Elements[i + 1].focus();
                    break;
                }
            }
        }
    }

    render() {
        const {valuetype} = this.state;
        let BorderColor = "";

        if (valuetype === "inc") {
            BorderColor = "blue-";            
        }
        else {
            BorderColor = "red-";
        }

        return (
            <div onKeyPress={this.KeyPressed} id="Add-budget-container">
                <select onChange={this.typeSelect} className={BorderColor + "border"} id="Add-type">
                    <option value="inc">+</option>
                    <option value="exp">-</option>
                </select>
                <input className={BorderColor + "border"} type="text" id="Add-description" placeholder="Add description" />
                <input onKeyPress={this.NotKeys} className={BorderColor + "border"} type="number" id="Add-value" placeholder="Value" />
                <button onClick={this.AddNewItem} className={BorderColor + `button`}><i className="fa fa-check-circle-o" aria-hidden="true"></i></button>
            </div>
        )
    }
}