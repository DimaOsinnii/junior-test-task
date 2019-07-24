var hamburger = document.querySelector(".hamburger");
var dropdownMenu = document.getElementById("myDropdown");
var toggle = false;
function show(dropMenu) {
    if(!toggle) {
        dropMenu.style.top = "10vh";
        toggle = !toggle;
    }
    else {
        dropMenu.style.top = "-500px";
        toggle = !toggle;
    }
}
hamburger.addEventListener("click", function () {
    this.classList.toggle("is-active");
    show(dropdownMenu);
});