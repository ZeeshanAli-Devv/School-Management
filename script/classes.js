axios.defaults.baseURL = server;
let editId = null

window.onload = async ()=>{
    await getSession()
    fetchTeachers()
    fetchClass()
}

const createClass = async (event)=>{
    event.preventDefault()
    let form = event.target

    if(editId)
    {
        updateClasses()
        return
    }
    const classes       = document.getElementById("class").value.trim();
    const fee           = document.getElementById("fee").value;
    const classTeacher  = document.getElementById("classTeacher").value.trim();
    const sections      = document.getElementById("sections").value.trim();

    const payload = {
        class : classes,
        fee,
        classTeacher,
        sections
    }   
    try
    {
        await axios.post("class", payload, getServerSession())
        closeDrawer()
        form.reset()
        Swal.fire({
            icon:"success",
            title: "Class Added",
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

const fetchTeachers = async ()=>{
    try
    {
        const res = await axios.get("teacher", getServerSession())
        const classTeacher = document.getElementById("classTeacher")
        for(let teacher of res.data)
        {
            const option = `<option value = "${teacher._id}">${teacher.teacherName}</option>`
            classTeacher.innerHTML += option
        }
    }
    catch(err)
    {
        console.log(err.response ? err.response.data.message : err.message);
    }
}

const fetchClass = async ()=>{
    try
    {
        const res = await axios.get("class", getServerSession())
        const classBox = document.getElementById("classBox")
        
        let num = 1

        for(let sclass of res.data)
        {
            const ui = `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-900">${num}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-900 capitalize">${sclass.class}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${sclass.fee}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${sclass.classTeacher.teacherName}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${sclass.sections}</td>
                    <td class="px-6 py-4 whitespace-nowraptext-sm font-medium">
                    <div class="flex items-center gap-3">
                        <button
                            onclick = "editClass(
                            '${sclass.class}',
                            '${sclass.fee}',
                            '${sclass.classTeacher.teacherName}',
                            '${sclass.sections}',
                            '${sclass._id}'
                            )" 
                            class="text-blue-600 w-6 h-6 bg-blue-100 rounded-full cursor-pointer hover:scale-110 transition-all">
                            <i class="ri-edit-line"></i>
                        </button>
                        <button
                            onclick = "deleteClass('${sclass._id}')" 
                            class="text-red-600  w-6 h-6 bg-red-100 rounded-full cursor-pointer hover:scale-110 transition-all">
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                    </td>
                </tr>
            `
            classBox.innerHTML += ui
            num++
        }
    }
    catch(err)
    {
        err.response ? err.response.data.message : err.message
    }
}

const deleteClass = async (id)=>{
    try
    {
        await axios.delete(`/class/${id}`, getServerSession())
        Swal.fire({
            icon:"success",
            title: "Class Delete",
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

const editClass = (classes, fee, teacher, section, id)=>{
    openDrawer()

    const classesField       = document.getElementById("class")
    const feeField           = document.getElementById("fee")
    const classTeacherField  = document.getElementById("teacherName")
    const sectionsField      = document.getElementById("sections")
    const updateButton       = document.getElementById("updateBtn")

    classesField.value      = classes
    feeField.value          = fee
    classTeacherField.value = teacher
    sectionsField.value     = section
    updateButton.innerHTML  = "Update"
    editId = id
}

const updateClasses = async ()=> {
    const classes       = document.getElementById("class").value.trim();
    const fee           = document.getElementById("fee").value;
    const classTeacher  = document.getElementById("classTeacher").value.trim();
    const sections      = document.getElementById("sections").value.trim();

    const payload = {
        class : classes,
        fee,
        classTeacher,
        sections
    }   
    
    try {
        await axios.put(`class/${editId}`, payload, getServerSession())
        closeDrawer()
        Swal.fire({
            icon:"success",
            title: "Class Update",
            showConfirmButton : false,
            toast : true,
            position : 'top-end',
            timerProgressBar : true,
            timer : 2000
        }).then(()=> {
            location.href = location.href;
        }) 
    } catch(err) {
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

const filterClass = ()=>{
    const input = document.getElementById("classSearch").value.toLowerCase();
   const rows = document.querySelectorAll("#classBox tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    if (text.includes(input)) {
      row.style.display = ""; 
    } else {
      row.style.display = "none"; 
    }
  });
}