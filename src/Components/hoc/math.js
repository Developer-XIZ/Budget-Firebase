const Mathz = {
    BudgetCalculator: (Budget) => {
        const Income = Budget.Income.reduce((Result , Item) => Result += Item.value, 0);
        const Expenses = Budget.Expenses.reduce((Result , Item) => Result += Item.value , 0);
        const IncPercentage = Income !== 0 ? "100%" : "---";
        const ExpPercentage = Income !== 0 && Expenses !== 0 ? `${parseInt((Expenses/Income)*100)}%` : "---";
        const type = (Income - Expenses) >= 0 ? "+" : "-";
        return {type , value: Math.abs(Income - Expenses) , Income , IncPercentage , Expenses , ExpPercentage};
    },
    BudgetAddType: (type , number) => {
        switch (type) {
            case "+" : return `+ ${number}` ;
            case "-" : return `- ${number}` ;
            case "%" : return `${number}%` ;
            default : return console.log("this undefined type please change your type");       
        }
    },
    BigNumbers: (Parses , number) => {
        if (number[number.length-3] !== ".")
        {
            number += ".00";
        }
        if (number.length > 6)
        {
            let result = "";
            for (let i = 0; i < number.length; i++)
            {
                if (Parses === "parse")
                {
                    if (i > 3 && i % 3 === 0)
                    {
                        result += "'";
                    }
                    result += number[number.length - i - 1];
                }
                else if ("Unparse") 
                {
                    if (number[number.length - i - 1] !== "'")
                    {
                        result += number[number.length - i - 1];
                    }
                }
            }
            return result.split("").reverse().join("");
        }
        else 
        {
            return number;
        }
    },
    BudgetItemPercentage: (Income , itemValue) => {
        let percentage = "---" ;
        if(Income !== 0)
        {
            percentage = `${((itemValue / Income) * 100).toFixed(0)}%`
        }
        return percentage;
    }
} 

export default Mathz;