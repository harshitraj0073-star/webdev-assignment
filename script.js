const form = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const totalAmount = document.getElementById("totalAmount");
const remainingAmount = document.getElementById("remainingAmount");
const financialGpa = document.getElementById("financialGpa");
const expenseList = document.getElementById("expenseList");

const balanceInput = document.getElementById("balanceInput");
const setBalanceBtn = document.getElementById("setBalanceBtn");

let startingBalance = 0;
let totalSpent = 0;

// Update Total Spent, Remaining Balance, and Financial GPA
function updateDisplay() {
    const remaining = startingBalance - totalSpent;
    totalAmount.textContent = totalSpent;
    remainingAmount.textContent = remaining;

    if (remaining < 0) {
        remainingAmount.style.color = "red";
    } else {
        remainingAmount.style.color = "green";
    }

    // Simple Financial GPA calculation
    if (startingBalance === 0) {
        financialGpa.textContent = "4.0 (A)";
    } else {
        const leftPercent = (remaining / startingBalance) * 100;
        if (leftPercent >= 50) financialGpa.textContent = "4.0 (A)";
        else if (leftPercent >= 25) financialGpa.textContent = "3.0 (B)";
        else if (leftPercent >= 0) financialGpa.textContent = "2.0 (C)";
        else financialGpa.textContent = "1.0 (Over Budget)";
    }
}

// Smart merchant detection (auto-select category as you type)
titleInput.addEventListener("input", function () {
    const text = titleInput.value.toLowerCase();
    if (text.includes("lunch") || text.includes("dinner") || text.includes("zomato") || text.includes("swiggy") || text.includes("food")) {
        categoryInput.value = "Food";
    } else if (text.includes("uber") || text.includes("ola") || text.includes("bus") || text.includes("metro") || text.includes("auto")) {
        categoryInput.value = "Travel";
    } else if (text.includes("book") || text.includes("pen") || text.includes("notebook") || text.includes("amazon")) {
        categoryInput.value = "Books";
    }
});

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
    const span = document.createElement("span");
    span.textContent = title + " (" + category + ") - ₹" + amount;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function () {
        totalSpent = totalSpent - amount;
        updateDisplay();
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    expenseList.appendChild(li);

    form.reset();
});
