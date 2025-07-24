axios.defaults.baseURL = server;

window.onload = async ()=>{
    await getSession()
    await fetchEmployee() 
    await getSalary()  
}

const createSalary = async (event)=>{
    event.preventDefault();

    const employeeName = document.getElementById("employee").value;
    const salary       = document.getElementById("salary").value;
    const salaryDate   = document.getElementById("date").value;
    const description  = document.getElementById("description").value.trim();

    const payload = {
        employeeName,
        salary,
        salaryDate,
        description
    }

    try
    {
        await axios.post("/salary", payload, getServerSession())
        Swal.fire({
            icon:"success",
            title: "Salary Added",
            showConfirmButton : false,
            toast : true,
            position : 'top-end',
            timerProgressBar : true,
            timer : 2000
        })
        .then(()=>{
            location.href = location.href;
        }) 
    }
    catch(err)
    {
        Swal.fire({
            icon:"error",
            title: "Subject Failed",
            text : err.response ? err.response.data.message : err.message,
            showConfirmButton : false,
            toast : true,
            position : 'top-end',
            timerProgressBar : true,
            timer : 2000
        })
    }
}

const fetchEmployee = async ()=>{
    try
    {
        const res =  await axios.get("/employee", getServerSession())
        const employeeData = document.getElementById("employee")

        for(let employee of res.data)
        {
            const option = `<option value = '${employee._id}'>${employee.employeeName}</option>`
            employeeData.innerHTML += option
        }
    }
    catch(err)
    {
        swal.fire({
            icon  : "error",
            title : "Failed",
            text  : err.response ? err.response.data.message : err.message
        })
    }
} 

const getSalary = async ()=>{
    const res = await axios.get("/salary", getServerSession());
    const salaryBody = document.getElementById("salary");
    salaryBody.innerHTML = ""

    for(let salary of res.data)
    {
        const ui = `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-900">${salary.employeeName.employeeName}</td>
                <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${salary.description}</td>
                <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${salary.salary}</td>
                <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${moment(salary.salaryDate).format('DD MMMM YYYY')}</td>
                <td class="px-6 py-4 whitespace-nowraptext-sm font-medium">
                  <div class="flex items-center gap-3">
                    <button onclick = "deleteSalary('${salary._id}')" class="text-red-600  w-6 h-6 bg-red-100 rounded-full cursor-pointer hover:scale-110 transition-all">
                      <i class="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </td>
                
              </tr>
        `
        salaryBody.innerHTML += ui
    }
}

const deleteSalary = async (id)=>{
    try
    {
        await axios.delete(`/salary/${id}`, getServerSession())
        Swal.fire({
            icon:"success",
            title: "Salary Delete",
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