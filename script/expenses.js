const createExpense = (event) =>{
    event.preventDefault();

    const title       = document.getElementById("title").value.trim();
    const amount      = document.getElementById("amount").value.trim();
    const date        = document.getElementById("date").value.trim();
    const description = document.getElementById("description").value.trim();

    console.log(title, amount, date, description);
}