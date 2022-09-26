function setNoise(width, height, base_freq, ocataves, contrast, brightness) {
    // CREATE SVG FILTER ELEMENT
    // ==================================================
    // create svg element
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewbox', `0 0 ${width} ${height}`);
    // create filter element
    filter = document.createElementNS("http://www.w3.org/2000/svg", 'filter');
    filter.id = 'f';
    // create filter effect element
    effect = document.createElementNS("http://www.w3.org/2000/svg", 'feTurbulence');
    effect.setAttribute('type', 'fractalNoise');
    effect.setAttribute('baseFrequency', base_freq);
    effect.setAttribute('numOctaves', ocataves);
    effect.setAttribute('stitchTiles', 'stitch');
    // create rect element
    rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('filter', 'url(#f)');
    // combine elements
    filter.append(effect);
    svg.append(filter);
    svg.append(rect);

    // SET NOISE DIV ELEMENT STYLE 
    // ==================================================
    // select noise div
    noise = document.querySelector('.noise');
    // set div size
    noise.style.width = width + (typeof width === 'number' ? 'px' : '');
    noise.style.height = height + (typeof height === 'number' ? 'px' : '');
    // set div css filter style
    noise.style.filter = `contrast(${contrast}%) brightness(${brightness}%)`;
    // set div background to svg data
    bg_gradient = 'radial-gradient(circle at -50% -50%, rgba(67,231,255,0.7), rgba(255,42,158,0.3))';
    bg_svg = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg.outerHTML)}")`;
    noise.style.background = bg_gradient + ',' + bg_svg;
}

