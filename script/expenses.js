axios.defaults.baseURL = server;
let editId = null

window.onload = async ()=>{
    await getSession()
    await getExpense()
}

const createExpense = async (event) =>{
    event.preventDefault();
    const form = event.target
    if(editId)
    {
        updateExpense()
        return
    }

    const title       = document.getElementById("title").value.trim();
    const amount      = document.getElementById("amount").value;
    const expenseAt        = document.getElementById("date").value;
    const description = document.getElementById("description").value.trim();

    const payload = {
        title,
        amount,
        expenseAt,
        description
    }
    try
    {
        await axios.post("/expense", payload, getServerSession())
        closeDrawer()
        form.reset()

        Swal.fire({
            icon:"success",
            title: "Expense Added",
            showConfirmButton : false,
            toast : true,
            position : 'top-end',
            timerProgressBar : true,
            timer : 2000
        }).then(() => {
            location.reload();
        });
    }
    catch(err)
    {
        Swal.fire({
        icon: "success",
        text : err.response ? err.response.data.message : err.message,
        title: "Added Failed",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false
        })
    }
}

const getExpense = async ()=>{
    const res = await axios.get("/expense", getServerSession());
    const expenseBody = document.getElementById("expenseBody");
    expenseBody.innerHTML = ""

    for(let expense of res.data)
    {
        const ui = `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-900">${expense.title.toUpperCase()}</td>
                <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500 capitalize">${expense.description}</td>
                <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${expense.amount}</td>
                <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${moment(expense.expenseAt).format('DD MMMM YYYY')}</td>
                <td class="px-6 py-4 whitespace-nowraptext-sm font-medium">
                  <div class="flex items-center gap-3">
                    <button onclick = 
                        "editExpense('${expense.title}','${expense.amount}','${moment(expense.expenseAt).format('DD MMMM YYYY')}','${expense.description}','${expense._id}')" 
                        class="text-blue-600 w-6 h-6 bg-blue-100 rounded-full cursor-pointer hover:scale-110 transition-all">
                      <i class="ri-edit-line"></i>
                    </button>
                    <button onclick = "deleteExpense('${expense._id}')" class="text-red-600  w-6 h-6 bg-red-100 rounded-full cursor-pointer hover:scale-110 transition-all">
                      <i class="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </td>
                
            </tr>
        `
        expenseBody.innerHTML += ui
    }
}

const deleteExpense = async (id)=>{
    try
    {
        await axios.delete(`/expense/${id}`, getServerSession())
        Swal.fire({
            icon:"success",
            title: "Expense Delete",
            showConfirmButton : false,
            toast : true,
            position : 'top-end',
            timerProgressBar : true,
            timer : 2000
        }).then(()=>{
            location.href = location.href;
        }) 
    }
    catch(err)
    {
        Swal.fire({
            icon:"error",
            title: "Delete Failed",
            text : err.response ? err.response.data.message : err.message,
            showConfirmButton : false,
            toast : true,
            position : 'top-end',
            timerProgressBar : true,
            timer : 2000
        })
    }
}

const editExpense = (title, amount, date, description, id)=>{
    openDrawer()
    const titleField       = document.getElementById("title")
    const amountField      = document.getElementById("amount")
    const dateField        = document.getElementById("date")
    const descriptionField = document.getElementById("description")
    const updateButton     = document.getElementById("updateButton")

    titleField.value       = title
    amountField.value      = amount
    dateField.value        = date
    descriptionField.value = description
    updateButton.innerHTML = "Update"
    editId = id
}

const updateExpense = async ()=>{
    const title       = document.getElementById("title").value.trim();
    const amount      = document.getElementById("amount").value;
    const expenseAt        = document.getElementById("date").value;
    const description = document.getElementById("description").value.trim();

    const payload = {
        title,
        amount,
        expenseAt,
        description
    }
    try
    {
        await axios.put(`/expense/${editId}`, payload, getServerSession())
        Swal.fire({
            icon:"success",
            title: "Expense Update",
            showConfirmButton : false,
            toast : true,
            position : 'top-end',
            timerProgressBar : true,
            timer : 2000
        }).then(() => {
            location.reload();
        });
    }
    catch(err)
    {
        Swal.fire({
        icon: "success",
        text : err.response ? err.response.data.message : err.message,
        title: "Update Failed",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false
        })
    }
}

const filterExpense = ()=>{
    const input = document.getElementById("expenseSearch").value.toLowerCase();
   const rows = document.querySelectorAll("#expenseBody tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    if (text.includes(input)) {
      row.style.display = ""; 
    } else {
      row.style.display = "none"; 
    }
  });
}