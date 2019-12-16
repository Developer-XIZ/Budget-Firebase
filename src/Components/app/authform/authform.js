import React from "react";
import KeyPress from './components/keypress';
import axios from 'axios';
import "./authform.css";

const AuthForm = ({Login}) => {
    const Sign = (e) => {
        console.log(process.env.REACT_APP_API_KEY);
        if(e.target.classList[1] === "enabled") {
            const Elements = e.target.parentNode.children;
            const Email = Elements[0].children[1].value;
            const Password = Elements[1].children[1].value;
            const ErrorText = Elements[3].children[0];
            const Loader = Elements[3].children[1];
    
            const ErrorContent = (ErrorText , Loader , type) => {
                if (type === "Error") {
                    ErrorText.classList.replace("hidden" , "visible");
                    Loader.classList.replace("visible" , "hidden");
                }
                else if (type === "Loader") {
                    ErrorText.classList.replace("visible" , "hidden");
                    Loader.classList.replace("hidden" , "visible");
                }
            }
    
            const BudgetBase = async (localId , type) => {
                if(type === "Sign up") {
                    const BudgetlocalId = await axios.post('https://budget-app-823.firebaseio.com/Budgets.json' , 
                    {
                        localId,
                        budgets:{
                            Income: [],
                            Expenses: []
                        }
                    });
                    const budgets = {
                        Income: [],
                        Expenses: []
                    };
                    Login(BudgetlocalId.data.name , budgets);
                }
                else if(type === "Sign in") {
                    try{
                        const Budget = await axios.get('https://budget-app-823.firebaseio.com/Budgets.json');
                        let budgets = Budget.data;
                        const BudgetlocalId = Object.keys(budgets).filter((item) => budgets[item].localId === localId);
                        budgets = budgets[BudgetlocalId].budgets === undefined ? {
                            Income: [],
                            Expenses: []
                        } : budgets[BudgetlocalId].budgets;
                        budgets.Income = budgets.Income === undefined ? [] : budgets.Income;
                        budgets.Expenses = budgets.Expenses === undefined ? [] : budgets.Expenses;
                        Login(BudgetlocalId , budgets);
                    }
                    catch(error){
                        console.log("Network Error");
                    }
                }
            }
                
            const SignToRealBudget = async (Signtype , email , password , ErrorText , Loader) => {
                const authData = {email , password , returnSecure: true}
                if(Signtype === "Sign up") {        
                    try{
                        const User = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}` , authData);
                        BudgetBase(User.data.localId , Signtype);
                    }
                    catch(error){
                        if(error.toString() === "Error: Network Error") {
                            ErrorText.textContent = "Network Error";
                        } 
                        else {
                            ErrorText.textContent = "Create another user";
                        }
    
                        ErrorContent(ErrorText , Loader , "Error");
                        ErrorText.style.color = "red";
                    }
                }
                else if("Sign in") {
                    try{
                        const User = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}` , authData);
                        BudgetBase(User.data.localId , Signtype);
                    }
                    catch(error) {
                        if(error.toString() === "Error: Network Error") {
                            ErrorText.textContent = "Network Error";
                        } 
                        else {
                            ErrorText.textContent = "No such user";
                        }
    
                        ErrorContent(ErrorText , Loader , "Error");
                        ErrorText.style.color = "red";
                    }
                }       
            }
            
            ErrorContent(ErrorText , Loader , "Loader");
            SignToRealBudget(e.target.textContent , Email , Password , ErrorText , Loader);
            // const Budget = await axios.post('https://budget-app-823.firebaseio.com/Budgets.json' , {email , password} );
            // const Budget = await axios.get('https://budget-app-823.firebaseio.com/Budgets.json');
            // const Budget = await axios.delete('https://budget-app-823.firebaseio.com/Budgets/-LvzR94BF8wgliQzxmtE.json' , {email , password} );
            // const Budget = await axios.put('https://budget-app-823.firebaseio.com/Budgets/-LvzR94BF8wgliQzxmtE.json' , {email , password} );
        }
    }
    
    const LabelClick = (e) => {
        e.target.nextElementSibling.focus();
    }

    return (
        <div id="background">
            <div id="AuthForm">
                <div className="InForm">
                    <label onClick={LabelClick}>Email</label>
                    <input onKeyPress={KeyPress} onChange={KeyPress} placeholder="Please writing on your Email"></input>
                </div>
                <div className="InForm">
                    <label onClick={LabelClick}>Password</label>
                    <input onKeyPress={KeyPress} onChange={KeyPress} type="password" placeholder="Please writing on your Password"></input>
                </div>
                <button onClick={Sign} className="button-red disabled">Sign up</button>
                <div id="ErrorContent">
                    <p className="visible">Please writing InForm{/*Error type is*/}</p>
                    <img className="hidden" src={require('./Double_Ring-1.4s-200px.gif')} alt={"This is loader"} />
                </div>
                <button onClick={Sign} className="button-green disabled">Sign in</button>
            </div>
        </div>
    )
}

export default AuthForm;