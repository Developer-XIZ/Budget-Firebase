import React , {Component} from "react";
import axios from 'axios';
import Save from './save';
import AuthForm from './authform';
import Top from './top';
import Bottom from './bottom';
import Mathz from '../hoc';
import "./app.css";

export default class App extends Component {
    state = {
        Logined: false,
        localId: undefined,
        SaveVisible: "hidden",
        Budget: {
            type: undefined ,
            value: undefined,
            Income: undefined,
            IncPercentage: undefined,
            Expenses: undefined,
            ExpPercentage: undefined
        },
        budgets: { // {name: "Car", value: 1000}
            Income: [],
            Expenses: []
        }
    };

    Login = (localId , budgets) => {
        this.setState(() => {
            return {Logined: true , localId , budgets}
        })
        this.BudgetRefresh();
    }

    Save = async (Income , Expenses , localId) => {
        if(this.state.SaveVisible === "visible"){
            try{
                await axios.put(`https://budget-app-823.firebaseio.com/Budgets/${localId}/budgets.json` , {Income , Expenses});
                this.setState(() => {
                    return {SaveVisible: "hidden"}
                })
            }
            catch(error){
                console.log("Network Error");
            }      
        }
    }

    AddBudgetItem = (type , NewItem) => {
        const BudgetName = type === "inc" ? "Income" : "Expenses";
        const budgets = this.state.budgets;
        //NewItem = this.CloneBudgetItem(NewItem , budgets , BudgetName , 0);
        budgets[BudgetName].push(NewItem);
        this.setState((prevState) => {
            return {budgets}
        })
        this.BudgetRefresh();
    }

    CloneBudgetItem = (Item , budgets , BudgetName , number) => {
        let CloneStop = true;
        for(let i = 0; i < budgets[BudgetName].length; i++)
        {
            if(budgets[BudgetName][i].name.indexOf(Item.name + `-${number}`) !== -1){
                CloneStop = false;
                Item = this.CloneBudgetItem(Item , budgets , BudgetName , number + 1);
                break;
            }
        }
        if(CloneStop){
            Item.name = Item.name + `-${number}`;
        }

        return Item;
    }

    DeleteItem = (Budget , index) => {
        let budgets = this.state.budgets;
        let start = budgets[Budget].slice(0 , index);
        let end = budgets[Budget].slice(index+1);
        budgets[Budget] = [...start , ...end];
        this.setState(() => {
            return {budgets}
        })
        this.BudgetRefresh();
    }

    BudgetRefresh = () => {
        this.setState((prevState) => {
            return {
                Budget: Mathz.BudgetCalculator(prevState.budgets),
                SaveVisible: "visible"
            }
        })
    }

    UNSAFE_componentWillMount() {
        this.BudgetRefresh();
    }

    render() {
        const {Budget , budgets , Logined , localId , SaveVisible} = this.state;
        const authForm = Logined ? null : <AuthForm Login={this.Login} />;
        const SaveOver = Logined ? SaveVisible : "hidden";
        return (
            <React.Fragment>
                <Save Save={this.Save} budgets={budgets} localId={localId} classname={SaveOver} />
                {authForm}
                <Top Budget={Budget} />
                <Bottom 
                AddBudgetItem={this.AddBudgetItem} 
                budgets={budgets} 
                Income={Budget.Income} 
                DeleteItem={this.DeleteItem} />
            </React.Fragment>
        )
    }
}