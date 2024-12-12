const content = document.getElementsByClassName("fade-interactive");

window.addEventListener("scroll", () => {
    const winH = window.innerHeight;

    for (let i = 0; i < content.length; i++) {
        const contentTop = content[i].getBoundingClientRect().top;

        if (contentTop - winH < 0) {
            // 요소가 뷰포트 안에 있을 때
            content[i].classList.add("in");
        } else {
            // 요소가 뷰포트를 완전히 벗어났을 때
            content[i].classList.remove("in");
        }
    }
});