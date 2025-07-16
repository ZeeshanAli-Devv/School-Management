const createClass = (event)=>{
    event.preventDefault()
    const classes       = document.getElementById("class").value.trim();
    const fee           = document.getElementById("fee").value.trim();
    const classTeacher  = document.getElementById("classTeacher").value.trim();
    const section       = document.getElementById("section").value.trim();

    console.log(classes, fee, classTeacher, section);
}