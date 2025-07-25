axios.defaults.baseURL = server;
let editId = null;

window.onload = async ()=>{
   await getSession()
   fetchSubject()
}

// Post Method  ---> send data on server
const createSubject = async (event) =>{
    event.preventDefault();
    let form = event.target

    if(editId)
    {
        saveSubject()
        return
    }
    
    const subjectName = document.getElementById("subject").value.trim();
    const fullMarks   = document.getElementById("fullmarks").value;

    const payload = {
        subjectName  : subjectName,
        fullmarks    : fullMarks
    }
    
    try
    {
        const res = await axios.post("/subject", payload, getServerSession())
        console.log(res.data);
        
        closeDrawer()
        form.reset()
        Swal.fire({
            icon:"success",
            title: "Subject Added",
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

// Get Method  ---> get data from server
const fetchSubject = async ()=>{
    try
    {
        const res = await axios.get("/subject", getServerSession());
        const subjectBox = document.getElementById("subjectBox");
        let num = 1;

        for(let subject of res.data)
        {
            const ui = `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-900">${num}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-900 capitalize">${subject.subjectName}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${subject.fullmarks}</td>
                    <td class="px-6 py-4 whitespace-nowraptext-sm font-medium">
                        <div class="flex items-center gap-3">
                            <button onclick = "editSubject('${subject.subjectName}','${subject.fullmarks}','${subject._id}')" class="text-blue-600 w-6 h-6 bg-blue-100 rounded-full cursor-pointer hover:scale-110 transition-all">
                                <i class="ri-edit-line"></i>
                            </button>
                            <button onclick = "deleteSubject('${subject._id}')" class="text-red-600  w-6 h-6 bg-red-100 rounded-full cursor-pointer hover:scale-110 transition-all">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `
            subjectBox.innerHTML += ui;
            num++;
        }
    }
    catch(err)
    {
        err.response ? err.response.data.message : err.message   
    }
}

// Delete Method  ---> delete data from server
const deleteSubject = async (id)=>{
    try
    {
        await axios.delete(`/subject/${id}`, getServerSession())
        Swal.fire({
            icon:"success",
            title: "Subject Delete",
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

// Update Method
const editSubject = (subject, fullmarks, id)=>{
    openDrawer()
    const subjectField       = document.getElementById("subject");   
    const fullmarksField     = document.getElementById("fullmarks");
    const updateButton       = document.getElementById("updateBtn")
    subjectField.value       = subject
    fullmarksField.value     = fullmarks
    updateButton.innerHTML   = "Update"
    editId = id
}

const saveSubject = async ()=>{
    const subjectName = document.getElementById("subject").value.trim();
    const fullMarks   = document.getElementById("fullmarks").value;

    const payload = {
        subjectName  : subjectName,
        fullmarks    : fullMarks
    }
    
    try
    {
        await axios.put(`/subject/${editId}`, payload, getServerSession())
        closeDrawer()
        Swal.fire({
            icon:"success",
            title: "Subject Update",
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

const filterSubject = ()=>{
    const input = document.getElementById("subjectSearch").value.toLowerCase();
   const rows = document.querySelectorAll("#subjectBox tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    if (text.includes(input)) {
      row.style.display = ""; 
    } else {
      row.style.display = "none"; 
    }
  });
}