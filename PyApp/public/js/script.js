//console.log("This is coming from script.js");

var arrError = []
const enumLogin = 1
const enumSignUp = 2

function showLoading() {
    $("#div_loading").show();
}
function hideLoading() {
    $("#div_loading").hide();
}

function showDivError(arrError, divError) {
    $("#" + divError).empty();

    for (var i = 0; i < arrError.length; i++) {
        $("#" + divError).append("<h5 class='error_font'><img src='icon/no.png' style='height:18px;margin-top:-2px' />  " + arrError[i] + "</h5>");
    }

    document.getElementById(divError).style.marginBottom = "15px";

    $("#" + divError).show();
}
function errorMessage(arrError) {
    var divName = "div_alert";
    document.getElementById("MdlDeleteTitle").textContent = "Error";
    
    showDivError(arrError, divName);
    document.getElementById(divName).style.marginTop = "10px";
    document.getElementById(divName).style.marginBottom = "25px";

    $("#btnModalOK").show();
    $("#modal_error").modal();
}
function successMessage(arrError) {
    var divName = "div_alert";
    document.getElementById("MdlDeleteTitle").textContent = "Success";
    
    showDivError(arrError, divName);
    document.getElementById(divName).style.marginTop = "10px";
    document.getElementById(divName).style.marginBottom = "25px";

    $("#btnModalOK").hide();
    $("#modal_error").modal();
}

function validateEmail(input)
{
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (input.match(validRegex)) {
        return true
    }
    else
    {
        return false
    }
}

function doLogin(value)
{
    var email = $("#email").val();
    var password = $("#password").val();

    var emailValid = validateEmail(email)
    if (emailValid == true)
    {
        var url = "/login?email=" + email + "&tokenemail=" + password
        if (value == enumSignUp)
            url = "/signup?email=" + email + "&password=" + password

        $.post(url, function(output){
            console.log("length: " + output.length)
            var message = output[0]
            if (message.toLowerCase().includes("error"))
            {
                errorMessage(output)
            }
            else
            {
                if(value == enumLogin)
                {
                    successMessage(output)
                    setTimeout(function () {
                        window.location.href = "/home"
                    }, 1200) 
                }
                //sign up ok, go to login
                else{
                    successMessage(output)
                    setTimeout(function () {
                        window.location.href = "/"
                    }, 1200)                    
                }
            }
        })
    }
    else
    {
        arrError = [];
        arrError.push("Invalid email. Please put the correct one.")
        errorMessage(arrError)
    }
}

function signOut()
{
    window.location.href = "/"
}

function getToken()
{
    var email = $("#email").val();
    var password = $("#password").val();
    var emailValid = validateEmail(email)
    if (emailValid == true)
    {
        var url = "/gettoken?email=" + email
        $.post(url, function(output){
            successMessage(output)
            setTimeout(function () {
                $("#modal_error").modal('hide')
                $("#password").show('slow')
                $("#btnLogin").show('slow')
                $("#btnGetToken").hide('slow')
            }, 1200)            
        })        
    }
    else
    {
        arrError = [];
        arrError.push("Invalid email. Please put the correct one.")
        errorMessage(arrError)
    }
}