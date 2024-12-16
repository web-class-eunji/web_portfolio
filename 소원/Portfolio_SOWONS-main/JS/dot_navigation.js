document.addEventListener("DOMContentLoaded", () => {
    const dots = document.querySelectorAll(".dot");
    const sections = document.querySelectorAll(".section");

    // 섹션 활성화 함수
    const activateDot = (targetId) => {
        dots.forEach(dot => {
            if (dot.dataset.target === targetId) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    };

    // IntersectionObserver 설정
    const observerOptions = {
        root: null, // 뷰포트 기준으로 감지
        threshold: 0.3 // 요소의 30%가 뷰포트에 들어오면 트리거
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // 섹션이 threshold를 만족하면
                const targetSection = entry.target;

                // 다음 섹션이 top으로 이동하도록 스크롤
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start" // top에 위치
                });

                // 네비게이션 닷 활성화
                activateDot(targetSection.id);
            }
        });
    }, observerOptions);

    // 모든 섹션에 observer 적용
    sections.forEach(section => {
        observer.observe(section);
    });

    // 네비게이션 닷 클릭 이벤트
    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const targetSection = document.getElementById(dot.dataset.target);
            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
            activateDot(dot.dataset.target);
        });
    });
});
