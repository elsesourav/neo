const menuToggle = document.getElementById("toggle-menu");
const navBar = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
   navBar.classList.toggle("active");
});