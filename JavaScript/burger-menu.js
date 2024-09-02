export function burgerMenu(){
  const menuIcon = document.querySelector(".menu-icon");
  const burgerMenu = document.querySelector(".burgermenu-container");
  
  menuIcon.addEventListener("click", () => {
    burgerMenu.classList.toggle("hidden");
  });
}


