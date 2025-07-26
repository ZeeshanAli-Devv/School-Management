axios.defaults.baseURL = server;
let editId = null

window.onload = async ()=>{
    await getSession()
    fetchEmployee()
}

const createEmployee = async (event)=>{
    event.preventDefault()
    const form = event.target 

    if(editId)
    {
        saveEmployee()
        return
    }

    const employeeName  = document.getElementById("employeeName").value.trim()
    const gender        = document.getElementById("gender").value.trim()
    const dob           = document.getElementById("dob").value.trim()
    const religion      = document.getElementById("religion").value.trim()
    const mobile        = document.getElementById("mobile").value.trim()
    const email         = document.getElementById("email-id").value.trim()
    const qualification = document.getElementById("qualification").value.trim()
    const designation   = document.getElementById("designation").value.trim()
    const address       = document.getElementById("address").value.trim()
    const city          = document.getElementById("city").value.trim()
    const state         = document.getElementById("state").value.trim()
    const country       = document.getElementById("country").value.trim()
    const pincode       = document.getElementById("pincode").value.trim();
    
    const payload = {
        employeeName,
        gender,
        dob,
        religion,
        mobile,
        email,
        qualification,
        designation,
        address,
        city,
        state,
        country,
        pincode,
    }

    try
    {
        await axios.post("/employee", payload, getServerSession())
        closeDrawer()
        form.reset()
        Swal.fire({
            icon:"success",
            title: "Employee Added",
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

const fetchEmployee = async ()=>{
    try
    {
        const res = await axios.get("employee", getServerSession())
        const employeeBox = document.getElementById("employeeBox")
        let num = 1;

        for(let employee of res.data)
        {
            const ui = `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-900">${num}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center ">
                            <div>
                                <div class="text-xs text-gray-900">${employee.employeeName}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${employee.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${employee.mobile}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500 capitalize">${employee.designation}</td>
                    <td class="px-6 py-4 whitespace-nowraptext-sm font-medium">
                        <div class="flex items-center gap-3">
                            <button 
                                onclick = "editEmployee(
                                    '${employee.employeeName}',
                                    '${employee.gender}',
                                    '${employee.religion}',
                                    '${employee.mobile}',
                                    '${employee.email}',
                                    '${employee.qualification}',
                                    '${employee.designation}',
                                    '${employee.city}',
                                    '${employee.state}',
                                    '${employee.country}',
                                    '${employee.pincode}',
                                    '${employee.address}',
                                    '${employee._id}' 
                                )" 
                                class="text-blue-600 w-6 h-6 bg-blue-100 rounded-full cursor-pointer hover:scale-110 transition-all">
                                <i class="ri-edit-line"></i>
                            </button>
                            <button onclick = "deleteEmployee('${employee._id}')" class="text-red-600  w-6 h-6 bg-red-100 rounded-full cursor-pointer hover:scale-110 transition-all">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `
            employeeBox.innerHTML += ui;
            num++;
        }
    }
    catch(err)
    {
        console.log(err.response ? err.response.data.message : err.message);
    }
}

const deleteEmployee = async (id)=>{
    try
    {
        await axios.delete(`/employee/${id}`, getServerSession())
        Swal.fire({
            icon:"success",
            title: "Employee Delete",
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

const editEmployee = (name, gender, religion, mobile, email, qualification, designation, city, state, country, pincode, address, id)=>{
    openDrawer()

    const employeeField      = document.getElementById("employeeName")
    const genderField        = document.getElementById("gender")
    const religionField      = document.getElementById("religion")
    const mobileField        = document.getElementById("mobile")
    const emailField         = document.getElementById("email-id")
    const qualificationField = document.getElementById("qualification")
    const designationField   = document.getElementById("designation")
    const cityField          = document.getElementById("city")
    const stateField         = document.getElementById("state")
    const countryField       = document.getElementById("country")
    const pincodeField       = document.getElementById("pincode")
    const addressField       = document.getElementById("address")
    const updateButton       = document.getElementById("updateBtn")

    employeeField.value     = name
    genderField.value       = gender
    religionField.value     = religion
    mobileField.value       = mobile
    emailField.value        = email
    qualificationField.value= qualification
    designationField.value  = designation
    cityField.value         = city 
    stateField.value        = state  
    countryField.value      = country
    pincodeField.value      = pincode
    addressField.value      = address
    updateButton.innerHTML  = "Update"
    editId = id
}

const saveEmployee = async ()=>{
    const employeeName  = document.getElementById("employeeName").value.trim()
    const mobile        = document.getElementById("mobile").value.trim()
    const email         = document.getElementById("email-id").value.trim()
    const designation   = document.getElementById("designation").value.trim()
    
    const payload = {
        employeeName,
        mobile,
        email,
        designation,
    }
    
    try
    {
        await axios.put(`employee/${editId}`, payload, getServerSession())
        closeDrawer()
        Swal.fire({
            icon:"success",
            title: "Employee Update",
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
            title: "Update Failed",
            text : err.response ? err.response.data.message : err.message,
            showConfirmButton : false,
            toast : true,
            position : 'top-end',
            timerProgressBar : true,
            timer : 2000
        })   
    }
}

const filterEmployee = ()=>{
    const input = document.getElementById("employeeSearch").value.toLowerCase();
   const rows = document.querySelectorAll("#employeeBox tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    if (text.includes(input)) {
      row.style.display = ""; 
    } else {
      row.style.display = "none"; 
    }
  });
}

// Export functionality for employees
document.addEventListener('DOMContentLoaded', () => {
  const exportSelect = document.querySelector('select'); // Get the export dropdown
  
  exportSelect.addEventListener('change', async (e) => {
    const format = e.target.value;
    
    if(format === 'PDF' || format === 'XLS') {
      try {
        // Fetch employee data
        const res = await axios.get("/employee", getServerSession());
        const employees = res.data;
        
        if(format === 'PDF') {
          await exportEmployeesToPDF(employees);
        } else {
          await exportEmployeesToXLS(employees);
        }
        
        // Reset the select
        e.target.value = 'Export';
        
      } catch(err) {
        Swal.fire({
          icon: "error",
          title: "Export Failed",
          text: err.response ? err.response.data.message : err.message,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
          timerProgressBar: true,
          timer: 2000
        });
      }
    }
  });
});

// Export employees to PDF
const exportEmployeesToPDF = async (employees) => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Add title
  doc.text('Employees List', 10, 10);
  
  // Add table headers
  const headers = [
    "No", 
    "Employee Name", 
    "Email", 
    "Mobile", 
    "Designation", 
    "Qualification"
  ];
  
  // Prepare data
  const data = employees.map((employee, index) => [
    index + 1,
    employee.employeeName,
    employee.email,
    employee.mobile,
    employee.designation,
    employee.qualification
  ]);
  
  // Add table
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 20
  });
  
  // Save the PDF
  doc.save('employees-list.pdf');
  
  Swal.fire({
    icon: "success",
    title: "PDF Exported",
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
    timerProgressBar: true,
    timer: 2000
  });
};

// Export employees to Excel
const exportEmployeesToXLS = async (employees) => {
  const XLSX = window.XLSX;
  
  // Prepare data
  const data = employees.map(employee => ({
    "No": employees.indexOf(employee) + 1,
    "Employee Name": employee.employeeName,
    "Email": employee.email,
    "Mobile": employee.mobile,
    "Designation": employee.designation,
    "Qualification": employee.qualification,
    "Gender": employee.gender,
    "DOB": employee.dob,
    "Religion": employee.religion,
    "Address": employee.address,
    "City": employee.city,
    "State": employee.state,
    "Country": employee.country,
    "Pincode": employee.pincode
  }));
  
  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(data);
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Employees");
  
  // Export to file
  XLSX.writeFile(wb, "employees-list.xlsx");
  
  Swal.fire({
    icon: "success",
    title: "Excel Exported",
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
    timerProgressBar: true,
    timer: 2000
  });
};