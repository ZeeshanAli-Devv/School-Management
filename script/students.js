axios.defaults.baseURL = server;
let editId = null;

window.onload = async ()=>{
  await getSession()
  await fetchStudent()
  await fetchClass()
}

const createAdmission = async (event)=>{
    event.preventDefault()
    const form = event.target

    if(editId)
    {
        updateStudent()
        return
    }

    const studentName   = document.getElementById("studentName").value.trim()
    const fatherName    = document.getElementById("fatherName").value.trim()
    const motherName    = document.getElementById("motherName").value.trim()
    const gender        = document.getElementById("gender").value.trim()
    const dob           = document.getElementById("dob").value.trim()
    const religion      = document.getElementById("religion").value.trim()
    const mobile        = document.getElementById("mobile").value
    const email         = document.getElementById("email-id").value.trim()
    const sclass        = document.getElementById("classes").value.trim()
    const section       = document.getElementById("section").value.trim()
    const address       = document.getElementById("address").value.trim()
    const city          = document.getElementById("city").value.trim()
    const state         = document.getElementById("state").value.trim()
    const country       = document.getElementById("country").value.trim()
    const pincode       = document.getElementById("pinCode").value
    const previousSchool= document.getElementById("previousSchool").value.trim()
    
    const payload = {
        studentName    : studentName,
        fatherName     : fatherName,
        motherName     : motherName,
        gender         : gender,
        dob            : dob,
        religion       : religion,
        mobile         : mobile,
        email          : email,
        class          : sclass,
        section        : section,
        address        : address,
        city           : city,
        state          : state,
        country        : country,
        pincode        : pincode,
        previousSchool : previousSchool 
    }   
    
    try
    {
        await axios.post("/student", payload, getServerSession())
        closeDrawer()
        form.reset()
        
        Swal.fire({
            icon:"success",
            title: "Student Added",
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
            title: "Student Failed",
            text : err.response ? err.response.data.message : err.message,
            showConfirmButton : false,
            toast : true,
            position : 'top-end',
            timerProgressBar : true,
            timer : 2000
        })   
    }
}

const fetchClass = async ()=>{
    try
    {
        const res = await axios.get("/class", getServerSession())
        const className = document.getElementById("classes")
        for(let sclass of res.data)
        {
            const option = `<option value = "${sclass._id}">${sclass.class}</option>`
            className.innerHTML += option
        }
    }
    catch(err)
    {
        console.log(err.response ? err.response.data.message : err.message);
    }
}

// Get Student
const fetchStudent = async ()=>{
    try
    {
        const res = await axios.get("/student", getServerSession())
        const studentBox = document.getElementById("studentBox")
        let num = 1;

        for(let student of res.data)
        {
            const ui = `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-900">${num}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center ">
                            <div>
                                <div class="text-xs text-gray-900 capitalize">${student.studentName}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${student.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${student.mobile}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500 capitalize">${student.class.class}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">${student.section.toUpperCase()}</span>
                    </td> 
                    <td class="px-6 py-4 whitespace-nowraptext-sm font-medium">
                        <div class="flex items-center gap-3">
                            <button 
                                onclick = "editStudent
                                (
                                '${student.studentName}', 
                                '${student.fatherName}',
                                '${student.motherName}',
                                '${student.gender}',
                                '${student.dob}',
                                '${student.religion}',
                                '${student.mobile}',
                                '${student.email}', 
                                '${student.class}', 
                                '${student.section}',
                                '${student.previousSchool}',
                                '${student.city}',
                                '${student.state}',
                                '${student.country}',
                                '${student.pincode}',
                                '${student.address}',
                                '${student._id}'
                                )"
                                class="text-blue-600 w-6 h-6 bg-blue-100 rounded-full cursor-pointer hover:scale-110 transition-all">
                                <i class="ri-edit-line"></i>
                            </button>
                            <button 
                                onclick = "deleteStudent('${student._id}')"
                                class="text-red-600  w-6 h-6 bg-red-100 rounded-full cursor-pointer hover:scale-110 transition-all">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `
            studentBox.innerHTML += ui;
            num++;
        }
    }
    catch(err)
    {
        err.response ? err.response.data.message : err.message
    }
    
}

// Delete Student
const deleteStudent = async (id)=>{
    try
    {
        await axios.delete(`/student/${id}`, getServerSession())
        Swal.fire({
            icon:"success",
            title: "Student Delete",
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

// Edit Student
const editStudent = (name, father, mother, gender, dob, religion, mobile, email, sclass, section, address, city, state, country, pinCode, previousSchool, id)=>{
    
    openDrawer()
    
    const studentField          = document.getElementById("studentName")
    const fatherField           = document.getElementById("fatherName")
    const motherField           = document.getElementById("motherName")
    const genderField           = document.getElementById("gender")
    const dobField              = document.getElementById("dob")
    const religionField         = document.getElementById("religion")
    const mobileField           = document.getElementById("mobile")
    const emailField            = document.getElementById("email-id")
    const classField            = document.getElementById("classes")
    const sectionField          = document.getElementById("section")
    const addressField          = document.getElementById("address")
    const cityField             = document.getElementById("city")
    const stateField            = document.getElementById("state")
    const countryField          = document.getElementById("country")
    const pincodeField          = document.getElementById("pinCode")
    const previousSchoolField   = document.getElementById("previousSchool")
    const updateButton          = document.getElementById("updatebtn")

    
    studentField.value        = name
    fatherField.value         = father 
    motherField.value         = mother
    genderField.value         = gender  
    dobField.value            = dob
    religionField.value       = religion   
    mobileField.value         = mobile
    emailField.value          = email
    classField.value          = sclass 
    sectionField.value        = section
    addressField.value        = address
    cityField.value           = city
    stateField.value          = state
    countryField.value        = country
    pincodeField.value        = pinCode
    previousSchoolField.value = previousSchool
    updateButton.innerHTML    = "Update"
    editId = id
}

// Update Student
const updateStudent = async ()=>{
    const studentName   = document.getElementById("studentName").value.trim()
    const mobile        = document.getElementById("mobile").value
    const email         = document.getElementById("email-id").value.trim()
    const sclass        = document.getElementById("classes").value.trim()
    const section       = document.getElementById("section").value.trim()
    
    const payload = {
        studentName    : studentName,
        mobile         : mobile,
        email          : email,
        class          : sclass,
        section        : section,
    }  
    try
    {
        await axios.put(`/student/${editId}`, payload, getServerSession())
        closeDrawer()
        Swal.fire({
            icon:"success",
            title: "Student Update",
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

function filterStudents() {
  const input = document.getElementById("studentSearch").value.toLowerCase();
  const rows = document.querySelectorAll("#studentBox tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    if (text.includes(input)) {
      row.style.display = ""; 
    } else {
      row.style.display = "none"; 
    }
  });
}

// Export functionality
document.addEventListener('DOMContentLoaded', () => {
  const exportSelect = document.querySelector('select'); // Assuming this is your export dropdown
  
  exportSelect.addEventListener('change', async (e) => {
    const format = e.target.value;
    
    if(format === 'PDF' || format === 'XLS') {
      try {
        // Fetch student data
        const res = await axios.get("/student", getServerSession());
        const students = res.data;
        
        if(format === 'PDF') {
          await exportToPDF(students);
        } else {
          await exportToXLS(students);
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

// Export to PDF function
const exportToPDF = async (students) => {
  // In a real implementation, you would send this to your backend
  // which would generate the PDF and return it for download
  
  // For demo purposes, we'll create a simple PDF client-side
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Add title
  doc.text('Student List', 10, 10);
  
  // Add table headers
  const headers = [
    "No", 
    "Student Name", 
    "Email", 
    "Mobile", 
    "Class", 
    "Section"
  ];
  
  // Prepare data
  const data = students.map((student, index) => [
    index + 1,
    student.studentName,
    student.email,
    student.mobile,
    student.class.class,
    student.section.toUpperCase()
  ]);
  
  // Add table
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 20
  });
  
  // Save the PDF
  doc.save('students-list.pdf');
  
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

// Export to Excel function
const exportToXLS = async (students) => {
  // Using SheetJS library (xlsx)
  const XLSX = window.XLSX;
  
  // Prepare data
  const data = students.map(student => ({
    "No": students.indexOf(student) + 1,
    "Student Name": student.studentName,
    "Father Name": student.fatherName,
    "Mother Name": student.motherName,
    "Email": student.email,
    "Mobile": student.mobile,
    "Class": student.class.class,
    "Section": student.section.toUpperCase(),
    "Gender": student.gender,
    "DOB": student.dob,
    "Address": student.address,
    "City": student.city,
    "State": student.state,
    "Country": student.country,
    "Pincode": student.pincode
  }));
  
  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(data);
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Students");
  
  // Export to file
  XLSX.writeFile(wb, "students-list.xlsx");
  
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