const header = document.querySelector('header');
const logoPaths = document.querySelectorAll('.main-logo-path');
const hamburgerPaths = document.querySelectorAll('.hamburger path');
const ratio = window.innerHeight;

window.addEventListener('scroll', () => {
    if (window.scrollY > ratio) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});