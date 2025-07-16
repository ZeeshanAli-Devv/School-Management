const login = async(event)=>{
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const payload = {
        email    : email,
        password : password
    }
    try
    {
        await axios.post("http://localhost:8080/school/login", payload)
        Swal.fire({
            icon:"success",
            title: "Login Success",
            showConfirmButton : false,
            toast : true,
            position : 'top-end',
            timerProgressBar : true,
            timer : 3000
        }).then(()=>{
            location.replace("app/dashboard.html")
        })
    }
    catch(err)
    {
        Swal.fire({
            icon:"error",
            title: "Login Failed",
            text : err.response ? err.response.data.message : err.message,
            showConfirmButton : false,
            toast : true,
            position : 'top-end',
            timerProgressBar : true,
            timer : 3000
        })
    }
}