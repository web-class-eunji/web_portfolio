document.addEventListener("DOMContentLoaded", () => {
    const imgGroupRt = document.querySelector('.best-selling-books-Rt');
    const imgGroupLt = document.querySelector('.best-selling-books-lt');
    const bestPage = document.querySelector('.best-selling-page');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        // best-selling-page가 화면의 맨 위에 닿았는지 확인
        const bestPageTop = bestPage.getBoundingClientRect().top;
        const imgGroupBottom = imgGroupRt.getBoundingClientRect().bottom;
        const viewportHeight = window.innerHeight;

        // best-selling-page가 화면 맨 위에 닿았을 때부터 모션을 적용
        if (bestPageTop <= 0) {
            const scrollY = window.scrollY;
            imgGroupRt.style.transform = `translateY(-${(scrollY - bestPage.offsetTop) * 0.2}px)`;
        } else {
            // 페이지가 맨 위에 닿기 전까지는 원래 위치 유지
            imgGroupRt.style.transform = `translateY(0px)`;
        }
        if (bestPageTop <= 0) {
            const scrollY = window.scrollY;
            imgGroupLt.style.transform = `translateY(${(scrollY - bestPage.offsetTop) * 0.2}px)`;
        } else {
            // 페이지가 맨 위에 닿기 전까지는 원래 위치 유지
            imgGroupLt.style.transform = `translateY(0px)`;
        }

    });
});