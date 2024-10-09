document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;

    if (description && amount) {
        const expense = {
            description,
            amount: parseFloat(amount)
        };

        addExpenseToList(expense);
        saveExpense(expense);
        updateTotalAmount(expense.amount);
    }
});

function addExpenseToList(expense) {
    const expenseList = document.getElementById('expense-list');
    const li = document.createElement('li');
    li.textContent = `${expense.description}: $${expense.amount.toFixed(2)}`;
    expenseList.appendChild(li);
}

function saveExpense(expense) {
    fetch('/api/expenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expense)
    })
    .then(response => response.json())
    .then(data => console.log('Expense saved:', data))
    .catch(error => console.error('Error:', error));
}

function updateTotalAmount(amount) {
    const totalAmountElement = document.getElementById('total-amount');
    const currentTotal = parseFloat(totalAmountElement.textContent);
    const newTotal = currentTotal + amount;
    totalAmountElement.textContent = newTotal.toFixed(2);
}
