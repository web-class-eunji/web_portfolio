const counters = [
    { selector: '.count-artist', time: 1.5, goal: 2 },
    { selector: '.count-artwork', time: 1.7, goal: 181 },
    { selector: '.count-visitor', time: 1.7, goal: 3270 },
];

const frame = 50;

function easeInExpo(x) {
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
}


function countUp(element, goal, time) {
    const totalFrame = time * frame;
    for (let i = 0; i <= totalFrame; i++) {
        const 진행도 = i / totalFrame;
        setTimeout(() => {
            element.innerText = parseInt(goal * easeInExpo(진행도));
        }, (i / frame) * 1000);
    }
}

const countElements = document.getElementsByClassName("count-circle");

window.addEventListener("scroll", () => {
    const winH = window.innerHeight;

    for (let i = 0; i < countElements.length; i++) {
        const contentTop = countElements[i].getBoundingClientRect().top;
        const contentBottom = countElements[i].getBoundingClientRect().bottom;

        const counterElement = countElements[i].querySelector(".circle-text");

        if (contentTop - winH < 0 && contentBottom > 0) {
            // 뷰포트에 들어오면
            if (!countElements[i].classList.contains("count-start")) {
                countElements[i].classList.add("count-start");
                const counterConfig = counters.find((counter) =>
                    counterElement.classList.contains(counter.selector.replace('.', ''))
                );
                if (counterConfig) {
                    countUp(counterElement, counterConfig.goal, counterConfig.time); // 카운트업 실행
                }
            }
        } else {
            // 뷰포트를 벗어나면
            countElements[i].classList.remove("count-start");
            counterElement.innerText = 0; // 초기화
        }
    }
});