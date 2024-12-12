const drawContent = document.getElementsByClassName("draw-interactive");

window.addEventListener("scroll", () => {
    const winH = window.innerHeight;

    for (let i = 0; i < drawContent.length; i++) {
        const contentTop = drawContent[i].getBoundingClientRect().top;
        const contentBottom = drawContent[i].getBoundingClientRect().bottom;

        if (contentTop - winH < 0 && contentBottom > 0) {
            // 요소가 뷰포트 안에 있을 때
            drawContent[i].classList.add("draw-start");
        } else {
            // 요소가 뷰포트를 완전히 벗어났을 때
            drawContent[i].classList.remove("draw-start");
        }
    }
});