const createSubject = (event) =>{
    event.preventDefault();

    const subjectName = document.getElementById("subjectName").value.trim();
    const fullMarks = document.getElementById("fullMarks").value.trim();

    console.log(subjectName , fullMarks);
    
}