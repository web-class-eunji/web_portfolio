const content = document.getElementsByClassName("fadein");
        // 공통 클래스인 content 불러옴
        window.addEventListener("scroll", () => {
            // 윈도우에 스크롤 했을 때
            const winH = window.innerHeight;
            // winH = 브라우저 위쪽에 잡다한거 빼고 콘텐츠가 표시되는 부분의 height만 대입함

            for (let i = 0; i < content.length; i++) {
                // i 가 content 의 갯수보다 작으면 i는 content의 갯수만큼 증가함
                const contentTop = content[i].getBoundingClientRect().top;
                // i 번째에 있는 요소의 top으로부터의 거리를 계산해서 contentTop에 대입함

                //-------------- getBoundingClientRect()로 얻을 수 있는것들!!!---------------------
                // top, bottom, left, right, width, height, x, y의 값이 출력됩니다.
                // top or y - 화면 상단 부터 대상의 처음 위치 값
                // bottom - 화면 상단 부터 대상의 끝 위치 값
                // left or x - 화면 좌측 부터 대상의 처음 위치 값
                // right - 화면 좌측 부터 대상의 끝 위치 값
                // width - 대상의 길이
                // height - 대상의 높이

                if (contentTop - winH < 0) {
                    // i번째에 있는 요소의 화면 상단 부터 대상의 처음 위치 값 - 브라우저에서 콘텐츠가 표시되는 부분의 height 한게 0 보다 작으면
                    content[i].classList.add("in");
                    // content 의  i 번째에 있는 요소에 in 을 붙여준다
                }
                if (contentTop - winH > 0) {
                    // i번째에 있는 요소의 화면 상단 부터 대상의 처음 위치 값-브라우저에서 콘텐츠가 표시되는 부분의 height 한게 0 보다 크면
                    content[i].classList.remove("in");
                    // content 의 i 번째에 있는 요소에 in 을 제거해서 스크롤을 올렸다가 다시 내려도 다시 작동하게 함
                }
            }
        });