document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage'); // 퍼센티지 가져오기
        const circle = bar.querySelector('circle:nth-child(2)'); // 진행 원 가져오기
        const percentageLabel = bar.querySelector('.percentage'); // 퍼센티지 텍스트

        const radius = circle.r.baseVal.value; // 반지름 가져오기
        const circumference = 2 * Math.PI * radius; // 원 둘레 계산

        circle.style.strokeDasharray = circumference; // 둘레 설정
        circle.style.strokeDashoffset = circumference; // 초기 상태 설정

        let currentPercentage = 0;

        const updateProgress = setInterval(() => {
            if (currentPercentage >= percentage) {
                clearInterval(updateProgress); // 목표 퍼센티지에 도달하면 중지
            } else {
                currentPercentage++;
                const offset = circumference - (circumference * currentPercentage) / 100;
                circle.style.strokeDashoffset = offset; // 애니메이션
                percentageLabel.textContent = `${currentPercentage}%`; // 텍스트 업데이트
            }
        }, 20); // 속도 조절
    });
});