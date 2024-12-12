document.querySelectorAll('.animated-circle-svg').forEach(svg => {
    const rootStyles = getComputedStyle(document.documentElement);

    // SVG별로 변수 이름 결정
    let variableName;
    if (svg.classList.contains('svg1')) {
        variableName = '--svg1-size';
    } else if (svg.classList.contains('svg2')) {
        variableName = '--svg2-size';
    }

    // 변수 값 읽어서 viewBox와 stroke-dasharray 설정
    if (variableName) {
        const svgSize = rootStyles.getPropertyValue(variableName).trim();
        svg.setAttribute('viewBox', `0 0 ${svgSize} ${svgSize}`);
    }
});

window.addEventListener('resize', () => {
    document.querySelectorAll('.animated-circle-svg').forEach(svg => {
        const rootStyles = getComputedStyle(document.documentElement);

        let variableName;
        if (svg.classList.contains('svg1')) {
            variableName = '--svg1-size';
        } else if (svg.classList.contains('svg2')) {
            variableName = '--svg2-size';
        }

        if (variableName) {
            const svgSize = rootStyles.getPropertyValue(variableName).trim();
            svg.setAttribute('viewBox', `0 0 ${svgSize} ${svgSize}`);
        }
    });
});
