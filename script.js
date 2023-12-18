//welcome user
// uname = log_name.value

username = localStorage.getItem('uname')
console.log(username);

hi.innerHTML = `Welcome ${username}`





//create account - register new account
function register(){
    //for that first have to fetch values from register.html

    uname = reg_name.value
    email = mail.value
    pswd = reg_pswd.value

    console.log(uname,email,pswd);

    //create acno details object

    accountDetails={
        
        uname,
        email,
        pswd,
        balance:0
    }

    //check id acno is already present in
    if(uname in localStorage){
        alert("User already registered")
    }
    //to set details in localstorage
    else{
        localStorage.setItem(uname,JSON.stringify(accountDetails))
        alert("Registration successful")
    
    //redirect to login page
    window.location="./login.html";
        }
    }





//login
function login(){
    uname = log_name.value
    pswd = log_psw.value

console.log(uname,pswd);

//here the username is stored in local storage in order to use in welcome user
localStorage.setItem('uname',uname);//(key,value)



if(uname in localStorage){
accountDetails=JSON.parse(localStorage.getItem(uname));


if(pswd==accountDetails.pswd){
    alert("Login successful")

localStorage.setItem('currentUser', uname);

    window.location="./main.html";
}
else{
    alert("Incorrect password");
}
}
else{
alert("Invalid account details")
}
}




//welcome user
// uname = log_name.value

username = localStorage.getItem('uname')
console.log(username);

hi.innerHTML = `Welcome ${username}`




function addIncome() {
    // Retrieve the current username from localStorage
    let currentUser = localStorage.getItem('currentUser');

    // Check if a user is logged in
    if (!currentUser) {
        alert("Please log in to add income.");
        return;
    }

    let type = document.getElementById('i_type').value;
    let amnt = parseInt(document.getElementById('i_amnt').value);

    // Additional validation checks can be performed here if needed

    if (isNaN(amnt) || amnt <= 0) {
        alert("Please enter a valid positive amount.");
        return;
    }

    let currentDate = new Date().toLocaleString(); // Get the current date and time


    if (currentUser in localStorage) {
        let accountDetails = JSON.parse(localStorage.getItem(currentUser));
        if (currentUser === accountDetails.uname) {
            accountDetails.balance += amnt;
            localStorage.setItem(currentUser, JSON.stringify(accountDetails));

            alert("Your amount is successfully added");
            document.getElementById("balance_amount").innerHTML = `<p style="color:red;font-weight:500;">RS ${accountDetails.balance}/-</p>`;
        
        
         // Add the income details to the income table
         let incomeTable = document.getElementById("income_table");
         let newRow = incomeTable.insertRow(-1); // Insert a new row at the end of the table

         let cell1 = newRow.insertCell(0); // Insert cells for the new row
         let cell2 = newRow.insertCell(1);
         let cell3 = newRow.insertCell(2);
         let cell4 = newRow.insertCell(3);

         cell1.innerHTML = type; // Set cell values
         cell2.innerHTML = `RS ${amnt}/-`;
         cell3.innerHTML = `RS ${accountDetails.balance}/-`;
         cell4.innerHTML = currentDate;
        
        }
    } else {
        alert("User not found or incorrect details.");
    }
}




// //expense

function addExpense() {

    let currentUser = localStorage.getItem('currentUser');

    // Fetching values from the input fields
    let expenseType = document.getElementById('e_type').value;
    let expenseAmount = parseInt(document.getElementById('e_amnt').value);

    // Checking if currentUser is set and exists in localStorage

    // let currentUser = localStorage.getItem('currentUser');


    if (!currentUser || !(currentUser in localStorage)) {
        alert("User not found or incorrect details");
        return;
    }



    // Fetching the account details of the current user
    let accountDetails = JSON.parse(localStorage.getItem(currentUser));

    // Validating the expense amount
    if (isNaN(expenseAmount) || expenseAmount <= 0) {
        alert("Please enter a valid amount");
        return;
    }
    let currentDate = new Date().toLocaleString(); // Get the current date and time


    // Checking if the expense amount exceeds the available balance
    if (expenseAmount > accountDetails.balance) {
        alert("Insufficient funds");
        return;
    }

    // Deducting the expense from the balance
    accountDetails.balance -= expenseAmount;

    // Updating the balance in localStorage
    localStorage.setItem(currentUser, JSON.stringify(accountDetails));

    // Displaying the updated expense balance in the "Total Expense" card
    let expenseBalanceElement = document.getElementById("expense_amount");
    if (expenseBalanceElement) {
        expenseBalanceElement.innerHTML = `<p style="color:red;font-weight:500;">RS ${accountDetails.balance}/-</p>`;
    


    // Update the expense table with the expense details
    let expenseTable = document.getElementById('expense_table').getElementsByTagName('tbody')[0];
    let currentDate = new Date().toLocaleString();

    let newRow = expenseTable.insertRow();
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);

    cell1.innerHTML = expenseType;
    cell2.innerHTML = expenseAmount;
    cell3.innerHTML = accountDetails.balance;
    cell4.innerHTML = currentDate;
    
    } else {
        alert("Expense balance display element not found");
    }
}



//clear
function dataclear(){
    document.getElementById('e_type').value = ' ';
    document.getElementById('i_type').value = ' ';
    document.getElementById('e_amnt').value = ' ';
    document.getElementById('i_amnt').value = ' ';
    document.getElementById('balance_amount').innerHTML = "<p style='color:red;font-weight:500;'>RS 0/-</p>"; 
    document.getElementById('expense_amount').innerHTML = "<p style='color:red;font-weight:500;'>RS 0/-</p>";



    alert('All datas cleared');
}



//logout()
function logout(){
   let logouting= confirm("Are you sure you want to logout?")
    console.log(logouting);

    localStorage.clear();
    window.location="./login.html"

}