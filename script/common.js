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

window.onload = ()=>{
  if(pic){
    picture.src = pic;
  }
}

const picture = document.getElementById("profilePicture");
const pic = localStorage.getItem("profile");
picture.src = pic || "https://api.dicebear.com/9.x/adventurer/svg?seed=Avery" + Math.random();

// Update Photo
const Updatedphoto = (event)=>{
  event.preventDefault()
  const pictureInput = document.getElementById("profilePictureInput");
  
  const file = pictureInput.files[0];
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  fileReader.onload =(e)=>{
    const data = e.target.result;
    picture.src = data;
    localStorage.setItem("profile", data)
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
const closeDrawer = () => {
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