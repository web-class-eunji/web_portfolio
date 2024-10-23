const carousel = document.querySelector(".carousel"); // 캐러셀 컨테이너 요소
const items = document.querySelectorAll(".carousel-item"); // 각각의 슬라이드(상품) 요소
const dots = document.querySelectorAll(".dot"); // 슬라이드 하단에 있는 닷들(페이지 네비게이션)

let currentIndex = 0; // 현재 슬라이드의 인덱스 (0부터 시작)
let itemWidth = items[0].offsetWidth; // 각 슬라이드의 너비 (동적으로 계산됨)
let totalItems = items.length; // 총 슬라이드 개수
let autoSlideInterval; // 자동 슬라이드를 위한 인터벌 변수

// 첫 번째 슬라이드와 마지막 슬라이드를 복제해서 앞뒤로 추가하여 무한 루프를 구현
const firstClone = items[0].cloneNode(true); // 첫 번째 슬라이드를 복제
const lastClone = items[totalItems - 1].cloneNode(true); // 마지막 슬라이드를 복제
carousel.appendChild(firstClone); // 복제된 첫 번째 슬라이드를 캐러셀의 맨 뒤에 추가
carousel.insertBefore(lastClone, items[0]); // 복제된 마지막 슬라이드를 캐러셀의 맨 앞에 추가

let isTransitioning = false; // 트랜지션(애니메이션)이 진행 중인지를 확인하는 변수

// 캐러셀의 위치를 업데이트하는 함수
function updateCarousel() {
    if (isTransitioning) return; // 트랜지션이 진행 중이면 다른 동작을 막음
    carousel.style.transition = "transform 3s ease"; // 슬라이드를 이동하는 트랜지션 효과 설정
    carousel.style.transform = `translateX(${-currentIndex * itemWidth}px)`; // 슬라이드 이동 (현재 슬라이드의 인덱스에 맞게 위치 계산)
    updateDots(); // 현재 슬라이드에 맞는 닷 업데이트
}

// 현재 슬라이드에 맞춰 닷(페이지 네비게이션)을 업데이트하는 함수
function updateDots() {
    dots.forEach((dot, index) => {
        // 모든 닷 중 현재 슬라이드에 해당하는 닷만 활성화
        dot.classList.toggle("active", index === currentIndex % totalItems);
    });
}

// 다음 슬라이드로 이동하는 함수
function goToNext() {
    if (isTransitioning) return; // 트랜지션 중이라면 동작하지 않음
    currentIndex++; // 인덱스를 증가시켜 다음 슬라이드로 이동
    updateCarousel(); // 캐러셀 업데이트

    if (currentIndex === totalItems) { // 마지막 슬라이드에 도달한 경우
        // 마지막 슬라이드에서 1번 슬라이드로 순간적으로 이동
        setTimeout(() => {
            carousel.style.transition = "none"; // 트랜지션 없이 이동
            currentIndex = 0; // 인덱스를 1번 슬라이드로 설정
            carousel.style.transform = `translateX(${-currentIndex * itemWidth}px)`; // 캐러셀 위치 즉시 업데이트
            isTransitioning = false; // 트랜지션이 완료되었음을 표시
        }, 3000); // 트랜지션 시간이 지난 후 이동
    } else {
        isTransitioning = true; // 트랜지션 중임을 표시
        setTimeout(() => (isTransitioning = false), 3000); // 트랜지션 시간 후 트랜지션 완료
    }
}

// 이전 슬라이드로 이동하는 함수
function goToPrev() {
    if (isTransitioning) return; // 트랜지션 중이라면 동작하지 않음
    currentIndex--; // 인덱스를 감소시켜 이전 슬라이드로 이동
    updateCarousel(); // 캐러셀 업데이트

    if (currentIndex === -1) { // 첫 번째 슬라이드에서 뒤로 이동하려는 경우
        // 첫 번째 슬라이드에서 마지막 슬라이드로 순간적으로 이동
        setTimeout(() => {
            carousel.style.transition = "none"; // 트랜지션 없이 이동
            currentIndex = totalItems - 1; // 인덱스를 마지막 슬라이드로 설정
            carousel.style.transform = `translateX(${-currentIndex * itemWidth}px)`; // 캐러셀 위치 즉시 업데이트
            isTransitioning = false; // 트랜지션이 완료되었음을 표시
        }, 500); // 트랜지션 시간이 지난 후 이동
    } else {
        isTransitioning = true; // 트랜지션 중임을 표시
        setTimeout(() => (isTransitioning = false), 3000); // 트랜지션 시간 후 트랜지션 완료
    }
}

// 특정 슬라이드로 이동하는 함수 (닷 클릭 시 사용)
function goToIndex(index) {
    if (isTransitioning) return; // 트랜지션 중이라면 동작하지 않음
    currentIndex = index; // 인덱스를 지정된 슬라이드로 설정
    updateCarousel(); // 캐러셀 업데이트
}

// 자동으로 다음 슬라이드로 이동하게 하는 함수
function startAutoSlide() {
    autoSlideInterval = setInterval(goToNext, 3000); // 3초마다 goToNext 호출
}

// 버튼 및 닷 클릭 시 이벤트 리스너 설정
document.querySelector(".next-btn").addEventListener("click", () => {
    goToNext(); // 다음 버튼 클릭 시 다음 슬라이드로 이동
    clearInterval(autoSlideInterval); // 자동 슬라이드 일시 중지
    startAutoSlide(); // 자동 슬라이드 재시작
});

document.querySelector(".prev-btn").addEventListener("click", () => {
    goToPrev(); // 이전 버튼 클릭 시 이전 슬라이드로 이동
    clearInterval(autoSlideInterval); // 자동 슬라이드 일시 중지
    startAutoSlide(); // 자동 슬라이드 재시작
});

// 닷(페이지 네비게이션) 클릭 시 특정 슬라이드로 이동
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        goToIndex(index); // 해당하는 슬라이드로 이동
        clearInterval(autoSlideInterval); // 자동 슬라이드 일시 중지
        startAutoSlide(); // 자동 슬라이드 재시작
    });
});

// 창 크기가 변경될 때마다 슬라이드 너비를 다시 계산하여 캐러셀을 업데이트
window.addEventListener("resize", () => {
    itemWidth = items[0].offsetWidth; // 슬라이드 너비 재계산
    updateCarousel(); // 캐러셀 위치 업데이트
});

// 초기 설정
updateCarousel(); // 첫 번째 슬라이드로 초기화
startAutoSlide(); // 자동 슬라이드 시작
