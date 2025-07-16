const signup = async (event)=> {
    event.preventDefault();
    const schoolName = document.getElementById("schoolName").value.trim();
    const dirName    = document.getElementById("dirName").value.trim();
    const mobile     = document.getElementById("mobile").value.trim();
    const email      = document.getElementById("email").value.trim();
    const password   = document.getElementById("password").value.trim();
    
    const payload =  {
        schoolName : schoolName,
        dirName    : dirName,
        mobile     : mobile,
        email      : email,
        password   : password,
    }
    
    try
    {
        await axios.post("http://localhost:8080/school/signup", payload)
        Swal.fire({
            icon:"success",
            title: "Signup Success",
            showConfirmButton : false,
            toast : true,
            position : 'top-end',
            timerProgressBar : true,
            timer : 3000
        }).then(()=>{
            location.replace("login.html")
        })
    }
    catch(err)
    {
        console.log(err.response ? err.response.data.message : err.message);
    }
}