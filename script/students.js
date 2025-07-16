const createAdmission = (event)=>{
    event.preventDefault()

    const studentName   = document.getElementById("studentName").value.trim()
    const fatherName    = document.getElementById("fatherName").value.trim()
    const motherName    = document.getElementById("motherName").value.trim()
    const gender        = document.getElementById("gender").value.trim()
    const dob           = document.getElementById("dob").value.trim()
    const religion      = document.getElementById("religion").value.trim()
    const mobile        = document.getElementById("mobile").value.trim()
    const email         = document.getElementById("email").value.trim()
    const sclass        = document.getElementById("class").value.trim()
    const section       = document.getElementById("section").value.trim()
    const address       = document.getElementById("address").value.trim()
    const city          = document.getElementById("city").value.trim()
    const state         = document.getElementById("state").value.trim()
    const country       = document.getElementById("country").value.trim()
    const pincode       = document.getElementById("pinCode").value.trim();
    const previousSchool= document.getElementById("previousSchool").value.trim()
    
    console.log(studentName, fatherName, motherName, gender, dob, religion, mobile, email, sclass, section, address, city, state, country, pincode, previousSchool)
}