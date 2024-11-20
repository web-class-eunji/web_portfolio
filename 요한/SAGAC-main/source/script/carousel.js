function createSlider(target, viewCount, gap, transitionTime, autoPlay){
                    // 매개변수
    target.classList.add('j-slider-container');
    // const viewCount = 2;
    // const gap = 4;
    // const transitionTime = 300;

    const slider = document.createElement('div');
    slider.classList.add('j-slider');
    
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('j-content-wrapper');
    
    while(target.childElementCount !== 0){
        target.firstElementChild.classList.add('j-content');
        contentWrapper.appendChild(target.firstElementChild);
    };

    const slideCount = contentWrapper.childElementCount;

    target.appendChild(slider);
    slider.appendChild(contentWrapper);
    // 아래와 같은 모양이 된다
        // div.slider-container > div.slider > div.content-wrapper

    const controls = document.createElement('div');
    controls.classList.add('j-controls');

    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');

    prevBtn.classList.add('j-prev');
    nextBtn.classList.add('j-next');

    prevBtn.innerText = '이전';
    nextBtn.innerText = '다음';

    const buttons = document.createElement('div');
    buttons.classList.add('j-buttons');

    controls.appendChild(prevBtn);
    controls.appendChild(nextBtn);
    controls.appendChild(buttons);

    target.appendChild(controls);

    for(let i = 0; i < slideCount; i++){
        const button = document.createElement('div');
        button.classList.add('j-radio-button');
        buttons.appendChild(button);

        button.addEventListener('click', ()=>{
            index = viewCount + i;
            applyIndexToSlider(true);
        });
    };

    buttons.children[0].classList.add('j-active');

    const cloneFirst = [];
    const cloneLast = [];

    for(let i = 0; i < viewCount; i++){
        cloneFirst.push(contentWrapper.children[i].cloneNode(true));
        cloneLast.push(contentWrapper.children[slideCount - 1 - i].cloneNode(true));
    };

    for(let i = 0; i < viewCount; i++){
        contentWrapper.appendChild(cloneFirst[i])
        contentWrapper.insertBefore(cloneLast[i], contentWrapper.firstElementChild);
    };

    
    let index = viewCount;
    let playAble = true;
    let autoPlayInterval;
    let contentWidth


    contentWrapper.style.gap = `${gap}px`

    calcSlideWidth();
    // resize 되기 전 컨텐츠 크기 정의

    applyIndexToSlider(false);
    
    window.addEventListener('resize', calcSlideWidth);

    nextBtn.addEventListener('click', next);

    prevBtn.addEventListener('click', ()=>{
        if(playAble){
            playAble = false;

            index--;
            applyIndexToSlider(true);
            
            setTimeout(()=>{
                playAble = true;

                if(index === viewCount -1){
                    index = contentWrapper.childElementCount-viewCount-1;
                    applyIndexToSlider(false);
                };

            }, transitionTime);
        };
    });


    function calcSlideWidth(){
        contentWidth = (slider.clientWidth - gap * (viewCount -1)) / viewCount;
        
        for(let i = 0; i < contentWrapper.childElementCount; i++){
            contentWrapper.children[i].style.width = `${contentWidth}px`
        };
        
        applyIndexToSlider(false);
    }
    // 반응형을 위한 함수


    function next(){
        if(playAble){
            playAble = false;

            index++;
            applyIndexToSlider(true);
            
            setTimeout(()=>{
                playAble = true;

                if(index === contentWrapper.childElementCount-viewCount){
                    index = viewCount;
                    applyIndexToSlider(false);
                };

            }, transitionTime);
        };
    }

    function applyIndexToSlider(animation){
        if(animation){
            contentWrapper.style.transition = `${transitionTime}ms`
        }else{
            contentWrapper.style.transition = `none`
        };

        contentWrapper.style.transform = `translateX(${index * -(contentWidth + gap)}px)`;

        resetButton();

        if(viewCount-1 === index){
            buttons.lastElementChild.classList.add('j-active');
        }else if(slideCount + viewCount === index){
            buttons.firstElementChild.classList.add('j-active');
        }else{
            buttons.children[index-viewCount].classList.add('j-active');
        };

        if(autoPlay){
            clearInterval(autoPlayInterval);

            autoPlayInterval = setInterval(()=>{
                next(); 
            }, 3000);
        }
    };

    function resetButton(){
        for(let i = 0; i < buttons.childElementCount; i++){
            buttons.children[i].classList.remove('j-active');
        }
    };
}