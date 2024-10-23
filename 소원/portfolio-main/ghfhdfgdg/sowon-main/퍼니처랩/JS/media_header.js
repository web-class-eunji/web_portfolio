const toggleBtn = document.querySelector(
    ".mobile-header-toggleBtn"
);
const menuBar = document.querySelector(".mobile-header-menubar");
const closeBtn = document.querySelector(".mobile-header-close");
const fixed = document.querySelector(".fixed");

toggleBtn.addEventListener("click", mobileHeaderOpen);
closeBtn.addEventListener("click", mobileHeaderClose);
const mainBlock = document.querySelector(".web-main");

function mobileHeaderOpen() {
    if (menuBar.style.display == "none") {
        menuBar.style.display = "block";
        // menuBar.classList.add('active')
        // fixed.style.position = "fixed"
        // fixed.style.top = "{0}px"
        mainBlock.style.display = "none";
    } else {
        menuBar.style.display = "none";
    }
}

function mobileHeaderClose() {
    if (menuBar.style.display == "block") {
        menuBar.style.display = "none";
        mainBlock.style.display = "block";
    } else {
        menuBar.style.display = "block";
    }
}