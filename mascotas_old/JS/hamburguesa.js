// JavaScript para controlar la apertura y cierre del menú hamburguesa
const menuToggle = document.querySelector(".menu-toggle");
const menuList = document.querySelector(".menu-list");

menuToggle.addEventListener("click", function () {
    menuList.classList.toggle("");
});