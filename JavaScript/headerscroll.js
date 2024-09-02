


document.addEventListener("scroll", function () {
  const header = document.getElementById("header");

  if (window.scrollY > 50) { // Adjust the scroll value to when you want the header to become fixed
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
