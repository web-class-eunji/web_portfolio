const carousel = document.querySelector(".carousel"); // 캐러셀의 전체 컨테이너를 선택하여 변수에 할당합니다.
const items = document.querySelectorAll(".carousel-item"); // 각각의 캐러셀 아이템을 선택하고, 이를 변수에 배열로 저장합니다.
const dots = document.querySelectorAll(".dot"); // 하단의 슬라이드 표시용 점(dot)들을 선택해 배열로 저장합니다.

let currentIndex = 1; // 첫 슬라이드를 보이게 하기 위해 인덱스를 1로 설정합니다.
let itemWidth = items[0].offsetWidth; // 각 슬라이드의 너비를 구해 변수에 저장합니다.
let totalItems = items.length; // 전체 슬라이드 수를 계산해 변수에 저장합니다.
let autoSlideInterval; // 자동 슬라이드를 위한 변수를 선언합니다.

const firstClone = items[0].cloneNode(true); // 첫 번째 슬라이드를 복제합니다.
const secondClone = items[1].cloneNode(true); // 두 번째 슬라이드를 복제합니다.
const thirdClone = items[2].cloneNode(true); // 세 번째 슬라이드를 복제합니다.
const lastClone = items[totalItems - 1].cloneNode(true); // 마지막 슬라이드를 복제합니다.
carousel.appendChild(firstClone); // 첫 번째 슬라이드 복제본을 리스트 맨 끝에 추가합니다.
carousel.appendChild(secondClone);
carousel.appendChild(thirdClone);
carousel.insertBefore(lastClone, items[0]); // 마지막 슬라이드 복제본을 리스트 맨 앞에 추가합니다.

let isTransitioning = false; // 트랜지션(슬라이드 이동 중인지) 상태를 확인하기 위한 변수입니다.

function updateCarousel() {
    // 슬라이드 이동 및 슬라이드 위치를 업데이트하는 함수입니다.
    if (isTransitioning) return; // 트랜지션 중이면 함수를 종료해 슬라이드가 중복 이동되지 않게 합니다.
    carousel.style.transform = `translateX(${-currentIndex * itemWidth}px)`; // 슬라이드 위치를 현재 인덱스 기준으로 설정합니다.
    updateDots(); // 슬라이드에 맞게 점(dot)을 업데이트합니다.
}

function updateDots() {
    // 현재 슬라이드에 맞게 점(dot) 상태를 업데이트합니다.
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === (currentIndex - 1) % totalItems); // 현재 슬라이드에 맞는 점만 'active' 클래스를 추가해 강조 표시합니다.
    });
}

function goToNext() {
    // 다음 슬라이드로 이동하는 함수입니다.
    if (isTransitioning) return; // 트랜지션 중일 때는 함수를 종료해 중복 이동을 방지합니다.
    currentIndex++; // 인덱스를 증가시켜 다음 슬라이드로 이동합니다.
    carousel.style.transition = "transform 0.5s ease"; // 트랜지션 효과를 추가해 자연스럽게 이동하도록 합니다.
    updateCarousel(); // 슬라이드 위치를 업데이트합니다.
    if (currentIndex === totalItems + 1) {
        // 마지막 슬라이드를 지나치면, 복제된 첫 슬라이드로 이동한 후 첫 번째 슬라이드로 순간이동합니다.
        setTimeout(() => {
            carousel.style.transition = "none"; // 순간 이동할 때 트랜지션을 제거해 부드럽게 이동합니다.
            currentIndex = 1; // 인덱스를 첫 번째 슬라이드로 설정합니다.
            updateCarousel(); // 첫 번째 슬라이드 위치로 이동합니다.
            isTransitioning = false; // 트랜지션 상태를 초기화합니다.
        }, 500);
    } else {
        isTransitioning = true; // 트랜지션이 시작되었음을 표시합니다.
        setTimeout(() => (isTransitioning = false), 500); // 트랜지션 종료 후 상태를 초기화합니다.
    }
}

function goToPrev() {
    // 이전 슬라이드로 이동하는 함수입니다.
    if (isTransitioning) return; // 트랜지션 중일 때는 함수를 종료합니다.
    currentIndex--; // 인덱스를 감소시켜 이전 슬라이드로 이동합니다.
    carousel.style.transition = "transform 0.5s ease"; // 트랜지션 효과를 추가합니다.
    updateCarousel(); // 슬라이드 위치를 업데이트합니다.
    if (currentIndex === 0) {
        // 첫 번째 슬라이드를 지나면 마지막 슬라이드로 순간이동합니다.
        setTimeout(() => {
            carousel.style.transition = "none"; // 순간 이동할 때 트랜지션을 제거합니다.
            currentIndex = totalItems; // 인덱스를 마지막 슬라이드로 설정합니다.
            updateCarousel(); // 마지막 슬라이드 위치로 이동합니다.
            isTransitioning = false; // 트랜지션 상태를 초기화합니다.
        }, 500);
    } else {
        isTransitioning = true; // 트랜지션이 시작되었음을 표시합니다.
        setTimeout(() => (isTransitioning = false), 500); // 트랜지션 종료 후 상태를 초기화합니다.
    }
}

function goToIndex(index) {
    // 특정 슬라이드로 이동하는 함수입니다.s
    if (isTransitioning) return; // 트랜지션 중일 때는 함수를 종료합니다.
    currentIndex = index + 1; // 클릭된 점(dot) 인덱스를 기반으로 현재 슬라이드 인덱스를 설정합니다.
    carousel.style.transition = "transform 0.5s ease"; // 트랜지션 효과를 추가합니다.
    updateCarousel(); // 슬라이드 위치를 업데이트합니다.
}

function startAutoSlide() {
    // 자동 슬라이드를 시작하는 함수입니다.
    autoSlideInterval = setInterval(goToNext, 3000); // 3초마다 `goToNext` 함수를 호출해 슬라이드가 자동으로 넘어가게 합니다.
}

document.querySelector(".next-btn").addEventListener("click", () => {
    // 오른쪽 버튼 클릭 시 다음 슬라이드로 이동합니다.
    goToNext(); // `goToNext` 함수를 호출합니다.
    clearInterval(autoSlideInterval); // 버튼 클릭 시 자동 슬라이드를 멈추고,
    startAutoSlide(); // 다시 자동 슬라이드를 시작합니다.
});

document.querySelector(".prev-btn").addEventListener("click", () => {
    // 왼쪽 버튼 클릭 시 이전 슬라이드로 이동합니다.
    goToPrev(); // `goToPrev` 함수를 호출합니다.
    clearInterval(autoSlideInterval); // 버튼 클릭 시 자동 슬라이드를 멈추고,
    startAutoSlide(); // 다시 자동 슬라이드를 시작합니다.
});

dots.forEach((dot, index) => {
    // 각 점(dot)에 대해 클릭 이벤트 리스너를 추가합니다.
    dot.addEventListener("click", () => {
        goToIndex(index); // 클릭된 dot 인덱스에 해당하는 슬라이드로 이동합니다.
        clearInterval(autoSlideInterval); // 클릭 시 자동 슬라이드를 멈추고,
        startAutoSlide(); // 다시 자동 슬라이드를 시작합니다.
    });
});

window.addEventListener("resize", () => {
    // 창 크기 조절 시 슬라이드 너비를 업데이트합니다.
    itemWidth = items[0].offsetWidth; // 새로운 슬라이드 너비를 계산하고 저장합니다.
    updateCarousel(); // 슬라이드 위치를 업데이트합니다.
});

window.onload = () => {
    // 페이지가 로드된 후 실행할 초기 설정입니다.
    carousel.style.transition = "none"; // 첫 로드 시 트랜지션 없이 슬라이드를 설정합니다.
    carousel.style.transform = `translateX(${-currentIndex * itemWidth}px)`; // 첫 슬라이드 위치로 이동합니다.
    updateCarousel(); // 현재 슬라이드 위치에 맞춰 dot을 업데이트합니다.
    setTimeout(() => {
        carousel.style.transition = "transform 0.5s ease"; // 로드 후 트랜지션을 활성화합니다.
        startAutoSlide(); // 자동 슬라이드를 시작합니다.
    }, 50); // 트랜지션 활성화 시 잠깐의 딜레이를 줍니다.
};