    // 각 h1 요소에 대해 사용할 텍스트 배열
    let typeTextElements = document.querySelectorAll(".type-text");
    let textToBeTypedArrList = [
        ["뜨거운", "아름다운", "무한한"],
        ["열정을", "꿈을", "앞날을"]
    ];
    let totalAnimationTime = 3000; // 각 텍스트가 유지될 시간 (3초)

    let index = 0; // 현재 텍스트 인덱스

    function typeText(element, text) {
        return new Promise((resolve) => {
            let currentIndex = 0;

            function typeChar() {
                if (currentIndex <= text.length) {
                    element.innerText = text.slice(0, currentIndex);
                    currentIndex++;
                    setTimeout(typeChar, 100); // 타이핑 속도 설정
                } else {
                    setTimeout(resolve, totalAnimationTime); // 타이핑 후 유지 시간
                }
            }

            typeChar();
        });
    }

    async function displayTexts() {
        while (true) {
            // 두 요소에 동시에 텍스트를 타이핑
            await Promise.all([
                typeText(typeTextElements[0], textToBeTypedArrList[0][index]),
                typeText(typeTextElements[1], textToBeTypedArrList[1][index])
            ]);

            // 다음 텍스트 인덱스로 이동
            index = (index + 1) % textToBeTypedArrList[0].length;
        }
    }

    // 애니메이션 시작
    displayTexts();
