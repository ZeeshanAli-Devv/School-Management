axios.defaults.baseURL = server;
let editId = null;

window.onload = async ()=>{
  await getSession()
  await fetchTeachers()
  await fetchSubject()
}

const createTeacher = async (event)=>{
    event.preventDefault()
    const form = event.target

    if(editId)
    {
        updateTeacher()
        return
    }
    
    const teacherName = document.getElementById("teacherName").value.trim()
    const gender = document.getElementById("gender").value.trim()
    const dob = document.getElementById("dob").value.trim()
    const religion = document.getElementById("religion").value.trim()
    const mobile = document.getElementById("mobile").value.trim()
    const address = document.getElementById("address").value.trim()
    const city = document.getElementById("city").value.trim()
    const state = document.getElementById("state").value.trim()
    const country = document.getElementById("country").value.trim()
    const pincode = document.getElementById("pincode").value
    const qualification = document.getElementById("qualification").value.trim()
    const previousSchool = document.getElementById("previousSchool").value.trim()
    const email = document.getElementById("email-id").value
    const subjects = document.getElementById("subjects").value.trim()
    
    const payload = {
        teacherName,
        gender,
        dob,
        religion,
        mobile,
        address,
        state,
        city,
        country,
        pincode,
        qualification,
        previousSchool,
        email,
        subjects
    }

    try
    {
        const res = await axios.post("/teacher", payload, getServerSession())
        console.log(res.data);
        
        closeDrawer()
        form.reset()
        Swal.fire({
            icon:"success",
            title: "Teacher Added",
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
        console.log(err.response ? err.response.data.message : err.message);
        
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

const fetchTeachers = async ()=>{
    try
    {
        const res = await axios.get("/teacher", getServerSession())
        const teacherBox = document.getElementById("teacherBox")
        let num = 1;

        for(let teacher of res.data)
        {
            const ui = `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-900">${num}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center ">
                            <div>
                                <div class="text-xs text-gray-900 capitalize">${teacher.teacherName}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${teacher.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${teacher.mobile}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500 capitalize">${teacher.subjects}</td> 
                    <td class="px-6 py-4 whitespace-nowraptext-sm font-medium">
                        <div class="flex items-center gap-3">
                            <button 
                                onclick = "editTeacher(
                                '${teacher.teacherName}',
                                '${teacher.gender}',
                                '${teacher.dob}',
                                '${teacher.religion}',
                                '${teacher.mobile}',
                                '${teacher.email}',
                                '${teacher.qualification}',
                                '${teacher.subjects}',
                                '${teacher.address}',
                                '${teacher.city}',
                                '${teacher.state}',
                                '${teacher.country}',
                                '${teacher.pincode}',
                                '${teacher.previousSchool}',
                                '${teacher._id}',
                                )"
                                class="text-blue-600 w-6 h-6 bg-blue-100 rounded-full cursor-pointer hover:scale-110 transition-all">
                                <i class="ri-edit-line"></i>
                            </button>
                            <button 
                                onclick = "deleteTeacher('${teacher._id}')"
                                class="text-red-600  w-6 h-6 bg-red-100 rounded-full cursor-pointer hover:scale-110 transition-all">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `
            teacherBox.innerHTML += ui;
            num++;
        }
    }
    catch(err)
    {
        err.response ? err.response.data.message : err.message
    }
    
}

const fetchSubject = async ()=>{
    try
    {
        const res =  await axios.get("subject", getServerSession())
        const classSubject = document.getElementById("subjects")

        for(let subject of res.data)
        {
            const option = `<option value = '${subject.subjectName}'>${subject.subjectName}</option>`
            classSubject.innerHTML += option
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

const deleteTeacher = async (id)=>{
    try
    {
        await axios.delete(`/teacher/${id}`, getServerSession())
        Swal.fire({
            icon:"success",
            title: "Teacher Delete",
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

const editTeacher = (teacherName, gender, dob, religion, mobile, email, qualification, subjects, address, city, state, country, pinCode, previousSchool, id)=>{
    
    openDrawer()
    
    const teacherField        = document.getElementById("teacherName")
    const genderField         = document.getElementById("gender")
    const dobField            = document.getElementById("dob")
    const religionField       = document.getElementById("religion")
    const mobileField         = document.getElementById("mobile")
    const emailField          = document.getElementById("email-id")
    const qualificationField  = document.getElementById("qualification")
    const subjectsField       = document.getElementById("subjects")
    const addressField        = document.getElementById("address")
    const cityField           = document.getElementById("city")
    const stateField          = document.getElementById("state")
    const countryField        = document.getElementById("country")
    const pincodeField        = document.getElementById("pincode")
    const previousSchoolField = document.getElementById("previousSchool")

    
    const updateButton  = document.getElementById("updatebtn")

    
    teacherField.value        = teacherName
    genderField.value         = gender  
    dobField.value            = dob
    religionField.value       = religion   
    mobileField.value         = mobile
    emailField.value          = email
    qualificationField.value  = qualification 
    subjectsField.value       = subjects
    addressField.value        = address
    cityField.value           = city
    stateField.value          = state
    countryField.value        = country
    pincodeField.value        = pinCode
    previousSchoolField.value = previousSchool

    updateButton.innerHTML    = "Update"
    editId = id
}

const updateTeacher = async ()=>{
    
    const teacherName   = document.getElementById("teacherName").value
    const mobile        = document.getElementById("mobile").value
    const email         = document.getElementById("email-id").value
    const subjects      = document.getElementById("subjects").value
    
    const payload = {
        teacherName    : teacherName,
        mobile         : mobile,
        email          : email,
        subjects       : subjects,
    }  
    try
    {
        await axios.put(`/teacher/${editId}`, payload, getServerSession())
        closeDrawer()
        Swal.fire({
            icon:"success",
            title: "Teacher Update",
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

// Export functionality for teachers
document.addEventListener('DOMContentLoaded', () => {
  const exportSelect = document.querySelector('select'); // Get the export dropdown
  
  exportSelect.addEventListener('change', async (e) => {
    const format = e.target.value;
    
    if(format === 'PDF' || format === 'XLS') {
      try {
        // Fetch teacher data
        const res = await axios.get("/teacher", getServerSession());
        const teachers = res.data;
        
        if(format === 'PDF') {
          await exportTeachersToPDF(teachers);
        } else {
          await exportTeachersToXLS(teachers);
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

// Export teachers to PDF
const exportTeachersToPDF = async (teachers) => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Add title
  doc.text('Teachers List', 10, 10);
  
  // Add table headers
  const headers = [
    "No", 
    "Teacher Name", 
    "Email", 
    "Mobile", 
    "Subject", 
    "Qualification"
  ];
  
  // Prepare data
  const data = teachers.map((teacher, index) => [
    index + 1,
    teacher.teacherName,
    teacher.email,
    teacher.mobile,
    teacher.subjects,
    teacher.qualification
  ]);
  
  // Add table
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 20
  });
  
  // Save the PDF
  doc.save('teachers-list.pdf');
  
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

// Export teachers to Excel
const exportTeachersToXLS = async (teachers) => {
  const XLSX = window.XLSX;
  
  // Prepare data
  const data = teachers.map(teacher => ({
    "No": teachers.indexOf(teacher) + 1,
    "Teacher Name": teacher.teacherName,
    "Email": teacher.email,
    "Mobile": teacher.mobile,
    "Subject": teacher.subjects,
    "Qualification": teacher.qualification,
    "Gender": teacher.gender,
    "DOB": teacher.dob,
    "Address": teacher.address,
    "City": teacher.city,
    "State": teacher.state,
    "Country": teacher.country,
    "Pincode": teacher.pincode
  }));
  
  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(data);
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Teachers");
  
  // Export to file
  XLSX.writeFile(wb, "teachers-list.xlsx");
  
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