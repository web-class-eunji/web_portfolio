let slides = document.querySelectorAll(".fade-slides .slide");
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 2000);
function nextSlide() {
  // nextSlide 라는 함수를 생성함
  slides[currentSlide].className = " slide";
  // slide(.advantages-motto-fade-slides .slide)[0].classNamme = "slide";
  // .어드벤티-모토-페이드인-슬라이드 라는 클래스를 가진 요소와 그 자식들인 slides라는 클래스를 가진 요소를 slides에 대입함
  // slides에 대입된 요소들의 0번째 요소의 클래스 네임에 slide를 삽입함.
  // 즉 간단하게 이 코드를 쓰는 이유는 .advantages-motto-fade-slides의 첫번째 자식이 slide라는 클래스를 포함하고 있어서 사진이 3번 돌아가고 나서도 다시 첫번째 사진으로 돌아오게 하기 위함
  currentSlide = (currentSlide + 1) % slides.length;
  // currentSlide(0) 에다가 1 % slides의 개수(3) 을 대입함 즉 0.333333333을 대입함 
  console.log(slides.length);
  console.log(currentSlide)
  slides[currentSlide].className = " slide showing";
  // slides[0.33333]의 클래스 네임에 slide와 showing 을 추가함
}
