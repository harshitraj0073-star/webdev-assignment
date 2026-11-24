const form = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const totalAmount = document.getElementById("totalAmount");
const remainingAmount = document.getElementById("remainingAmount");
const expenseList = document.getElementById("expenseList");

const balanceInput = document.getElementById("balanceInput");
const setBalanceBtn = document.getElementById("setBalanceBtn");

let startingBalance = 0;
let totalSpent = 0;

// Update both Total Spent and Remaining Balance
function updateDisplay() {
    const remaining = startingBalance - totalSpent;
    totalAmount.textContent = totalSpent;
    remainingAmount.textContent = remaining;

    if (remaining < 0) {
        remainingAmount.style.color = "red";
    } else {
        remainingAmount.style.color = "green";
    }
}

// Set Balance button
setBalanceBtn.addEventListener("click", function () {
    const val = Number(balanceInput.value);
    if (val < 0 || balanceInput.value === "") {
        alert("Please enter a valid balance");
        return;
    }
    startingBalance = val;
    updateDisplay();
});

// Add Expense
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;

    if (title === "" || amount <= 0) {
        alert("Please enter valid name and amount");
        return;
    }

    totalSpent = totalSpent + amount;
    updateDisplay();

    const li = document.createElement("li");
    li.textContent = title + " (" + category + ") - ₹" + amount;
    expenseList.appendChild(li);

    form.reset();
});
