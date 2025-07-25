axios.defaults.baseURL = server;

window.onload = async ()=>{
  await getSession()
  if(session)
  {
    location.replace("app/dashboard.html");
  }
}

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
        const res = await axios.post("school/login", payload)
        localStorage.setItem("token", res.data.token)

        Swal.fire({
            icon:"success",
            title: "Login Success",
            showConfirmButton : false,
            toast : true,
            position : 'top-end',
            timerProgressBar : true,
            timer : 2000
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
            timer : 2000
        })
    }
}