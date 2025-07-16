const createPayment = (event) =>{
    event.preventDefault();
    
    const classes       = document.getElementById("class").value.trim();
    const fee           = document.getElementById("fee").value.trim();
    const classTeacher  = document.getElementById("classTeacher").value.trim();
    const section       = document.getElementById("section").value.trim();
    const date          = document.getElementById("date").value.trim();
    const month         = document.getElementById("month").value.trim();

    console.log(classes, fee, classTeacher, section, date, month);
}