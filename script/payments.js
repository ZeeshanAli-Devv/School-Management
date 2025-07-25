axios.defaults.baseURL = server;

window.onload = async ()=>{
    await getSession()
    await fetchStudent()
    await fetchpayment()
}
const createPayment = async (event) =>{
    event.preventDefault();
    
    const student     = document.getElementById("student").value;
    const fatherName  = document.getElementById("fatherName").value.trim();
    const mobile      = document.getElementById("mobile").value;
    const fee         = document.getElementById("fee").value;
    const status      = document.getElementById("status").value;
    const date        = document.getElementById("date").value;

    const payload = {
        student,
        fatherName,
        mobile,
        fee,
        status,
        date,
    }

    try
    {
        const res = await axios.post("/payment", payload, getServerSession())
        Swal.fire({
            icon:"success",
            title: "Payment Added",
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
            title: "Failed",
            text : err.response ? err.response.data.message : err.message,
            showConfirmButton : false,
            toast : true,
            position : 'top-end',
            timerProgressBar : true,
            timer : 2000
        })
    }
}

const fetchStudent = async ()=>{
    try
    {
        const res = await axios.get("/student", getServerSession())
        const studentName = document.getElementById("student")
        for(let students of res.data)
        {
            const option = `<option value = "${students._id}">${students.studentName}</option>`
            studentName.innerHTML += option
        }
    }
    catch(err)
    {
        console.log(err.response ? err.response.data.message : err.message);
    }
}

const fetchpayment = async ()=>{
    try
    {
        const res = await axios.get("/payment", getServerSession())
        const paymentData = document.getElementById("payment")
        let num = 1

        for(let payment of res.data)
        {
        const statusColor = payment.status.toLowerCase() === 'paid' 
            ? 'bg-green-400' 
            : payment.status.toLowerCase() === 'pending' 
            ? 'bg-yellow-400' 
            : 'bg-red-400';

            const ui = 
            `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-900">${num}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${payment.student ? payment.student.studentName : 'Deleted Student'}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${payment.fatherName}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${payment.mobile}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${payment.fee}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-3 py-1 text-xs font-medium rounded-full ${statusColor} text-white">${payment.status.toUpperCase()}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${moment(payment.date).format('DD MMMM YYYY')}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <button onclick = "deletepayment('${payment._id}')" class="text-red-600  w-6 h-6 bg-red-100 rounded-full cursor-pointer hover:scale-110 transition-all">
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </td>
                </tr>
            `
            paymentData.innerHTML += ui;
            num++   
        }

    }
    catch(err)
    {
        console.log(err.response ? err.response.data.message : err.message)
    }
}

const deletepayment = async (id)=>{
    try
    {
        await axios.delete(`/payment/${id}`, getServerSession())
        Swal.fire({
            icon:"success",
            title: "Payment Delete",
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

const filterPayment = ()=>{
    const input = document.getElementById("paymentSearch").value.toLowerCase();
   const rows = document.querySelectorAll("#payment tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    if (text.includes(input)) {
      row.style.display = ""; 
    } else {
      row.style.display = "none"; 
    }
  });
}