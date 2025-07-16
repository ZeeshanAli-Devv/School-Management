const createTeacher = (event)=>{
    event.preventDefault()

    const studentName   = document.getElementById("teacherName").value.trim()
    const gender        = document.getElementById("gender").value.trim()
    const dob           = document.getElementById("dob").value.trim()
    const religion      = document.getElementById("religion").value.trim()
    const mobile        = document.getElementById("mobile").value.trim()
    const email         = document.getElementById("email").value.trim()
    const subject       = document.getElementById("subject").value.trim()
    const qualification = document.getElementById("qualification").value.trim()
    const address       = document.getElementById("address").value.trim()
    const city          = document.getElementById("city").value.trim()
    const state         = document.getElementById("state").value.trim()
    const country       = document.getElementById("country").value.trim()
    const pincode       = document.getElementById("pinCode").value.trim();
    const previousSchool= document.getElementById("previousSchool").value.trim()
    
    console.log(studentName, gender, dob, religion, mobile, email, subject, qualification, address, city, state, country, pincode, previousSchool)
}