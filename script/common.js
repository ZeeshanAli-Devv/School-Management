document.addEventListener("DOMContentLoaded", async () => {
  // Profile Picture set from localStorage
  const profile = localStorage.getItem("profile");
  const pic = document.getElementById("profilePicture");
  
  if (pic && profile) {
    pic.src = profile;
  }

  // Set picture change event if input exists
  const input = document.getElementById("pictureInput");
  if (input) {
    input.onchange = Updatedphoto;
  }
});

// Picture Change Handler
const Updatedphoto = () => {
  const input = document.getElementById("profilePictureInput");
  const pic = document.getElementById("profilePicture");
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = (e) => {
    const data = e.target.result;
    pic.src = data;
    localStorage.setItem("profile", data);
  };
};


// Check Token
let session = null;
const server = "http://localhost:8080";
axios.defaults.baseURL = server;

const getSession = async ()=>{
    const token = localStorage.getItem("token");
    const url = location.href;

    if(!token)
    {
        if(url.includes("login.html") || url.includes("signup.html"))
        {
            return
        }
        location.replace("../login.html");
    }
    else{
        try
        {
            const res = await axios.post("token/verify", {token : token})
            session = res.data;
        }
        catch(err)
        {
            localStorage.clear()
            if(url.includes("login.html") || url.includes("signup.html"))
            {
                return
            }
            location.replace("../login.html");
        }
    }
}

// Toggle Functionality
const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");
    const navbar = document.getElementById("navbar");
    
    // For desktop (lg screens)
    if (window.innerWidth >= 1024) {
        // Toggle sidebar width
        if (sidebar.classList.contains("lg:w-[250px]")) {
            // Hide sidebar
            sidebar.classList.remove("lg:w-[250px]");
            sidebar.classList.add("lg:w-0");
            
            // Adjust main and navbar
            main.classList.remove("lg:ml-[250px]");
            navbar.classList.remove("lg:ml-[250px]");
            navbar.classList.remove("lg:w-[calc(100%-250px)]");
            navbar.classList.add("lg:w-full");
        } else {
            // Show sidebar
            sidebar.classList.add("lg:w-[250px]");
            sidebar.classList.remove("lg:w-0");
            
            // Adjust main and navbar
            main.classList.add("lg:ml-[250px]");
            navbar.classList.add("lg:ml-[250px]");
            navbar.classList.add("lg:w-[calc(100%-250px)]");
            navbar.classList.remove("lg:w-full");
        }
    } 
    // For mobile/tablet (keep existing behavior)
    else {
        sidebar.classList.toggle("-translate-x-full");
    }
}

// Logout functions
function confirmLogout() {
    Swal.fire({
    title: 'Logout?',
    text: 'Are you sure you want to logout?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#4f46e5',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, logout'
    }).then((result) => {
    if (result.isConfirmed) {
         location.replace("../index.html")
        Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success');

    }
    });
}

// Open Drawer
const drawer = document.getElementById('drawer');
const openDrawer = () => {
    drawer.classList.remove('hidden');
    drawer.classList.remove('animate__fadeOut');
    drawer.classList.add('animate__animated', 'animate__fadeIn');
};

// Close Drawer
const closeDrawer = (redirect=false) => {
    if(redirect)
    {
        location.href = location.href
    }

    drawer.classList.remove('animate__fadeIn');
    drawer.classList.add('animate__animated', 'animate__fadeOut');
    setTimeout(() => {
        drawer.classList.add('hidden');
    }, 300);
};

// Faq's 
const frequentlyTab = (faqId) => {
  const p = document.getElementById(faqId);
  p.classList.toggle("max-h-0");
  p.classList.toggle("opacity-0");
  p.classList.toggle("max-h-40");
  p.classList.toggle("opacity-100");
};

// Toggle Password
const togglePassword = (passwordInput , eyeIcon) =>{
    const password = document.getElementById(passwordInput);
    const icon     = document.getElementById(eyeIcon);

    if(password.type == "password"){
        password.type = "text";
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
    }
    else{
        password.type = "password";
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
    }
}

// Authorize User
const getServerSession = ()=>{
    const token = localStorage.getItem("token");
    const options = {
        headers :  {
            Authorization  : `Bearer ${token}`
        }
    }
    return options
}

function searchData(input) {
  const filter = input.value.toLowerCase();
  const sidebarLinks = document.querySelectorAll('#sidebar nav a');

  sidebarLinks.forEach(link => {
    const text = link.innerText.toLowerCase();
    if (text.includes(filter)) {
      link.style.display = 'flex'; // Show
    } else {
      link.style.display = 'none'; // Hide
    }
  });
}
