const TextContent = document.getElementsByClassName("interactive-text");

window.addEventListener("scroll", () => {
    const winH = window.innerHeight;

    for (let i = 0; i < TextContent.length; i++) {
        const contentTop = TextContent[i].getBoundingClientRect().top;

        if (contentTop - winH < 0) {
            // 요소가 뷰포트 안에 있을 때 순차적으로 클래스 추가
            setTimeout(() => {
                TextContent[i].classList.add("in");
            }, i * 400); // 각 줄에 300ms씩 딜레이 추가
        } else {
            // 요소가 뷰포트를 완전히 벗어났을 때 클래스 제거
            TextContent[i].classList.remove("in");
        }
    }
});