
// 모든 탭 버튼과 탭 콘텐츠 가져오기
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// 탭 버튼 클릭 이벤트 처리
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // 모든 버튼의 'active' 클래스 제거
        tabButtons.forEach(btn => btn.classList.remove('active'));

        // 모든 콘텐츠의 'active' 클래스 제거
        tabContents.forEach(content => content.classList.remove('active'));

        // 클릭된 버튼과 연결된 콘텐츠에 'active' 클래스 추가
        button.classList.add('active');
        document.getElementById(`tab-${targetTab}`).classList.add('active');
    });
});

