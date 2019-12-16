import is from 'is_js';

const KeyPress = (e) => {
    const Elements = e.target.parentNode.parentNode.children;
    let Email = Elements[0].children[1].value;
    let Password = Elements[1].children[1].value;
    const SignIN = Elements[2];
    const ErrorText = Elements[3].children[0];
    const SignUP = Elements[4];

    if(e.key === undefined)
    {
        if(is.email(Email) && Password.length > 7) {
            if(SignIN.classList[1] === "disabled" && SignUP.classList[1] === "disabled") {
                SignIN.classList.replace("disabled" , "enabled");
                SignUP.classList.replace("disabled" , "enabled");
                SignIN.disabled = false;
                SignUP.disabled = false;
                ErrorText.textContent = "IsValid Inform";
                ErrorText.style.color = "green";
            }
        }
        else {
            if(SignIN.classList[1] === "enabled" && SignUP.classList[1] === "enabled") {
                SignIN.classList.replace("enabled" , "disabled");
                SignUP.classList.replace("enabled" , "disabled");
            }
            if(e.target.value === Email) {
                ErrorText.textContent = "Writing correct Email";
                if(is.email(Email))
                {
                    ErrorText.style.color = "green";
                }
                else {
                    ErrorText.style.color = "rgba(0 , 0 , 0 , 0.7)";
                }
            }
            else if(e.target.value === Password) {
                ErrorText.textContent = "Minimum in 8 letters";
                if(Password.length > 7)
                {
                    ErrorText.style.color = "green";
                }
                else {
                    ErrorText.style.color = "rgba(0 , 0 , 0 , 0.7)";
                }
            }
        }
    }
    else if(e.key === "Enter" && ErrorText.style.color === "green" && ErrorText.textContent !== "IsValid Inform") {
        if(e.target.value === Email)
        {
            Elements[1].children[1].focus();
            ErrorText.textContent = "Minimum in 8 letters";
        }
        else if(e.target.value === Password)
        {
            Elements[0].children[1].focus();
            ErrorText.textContent = "Writing correct Email";
        }
        ErrorText.style.color = "rgba(0 , 0 , 0 , 0.7)";
    }
    else if(e.key === "Enter" && ErrorText.textContent !== "IsValid Inform") {
        ErrorText.style.color = "red";
    }   
}

export default KeyPress;