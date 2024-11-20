const drawContent = document.getElementsByClassName("draw-interactive");
window.addEventListener("scroll", () => {
    const winH = window.innerHeight;

    for (let i = 0; i < drawContent.length; i++) {
        const contentTop = drawContent[i].getBoundingClientRect().top;

        if (contentTop - winH < 0) {
            drawContent[i].classList.add("draw-start");
        }
        if (contentTop - winH > 0) {
            drawContent[i].classList.remove("draw-start");
        }
    }
});