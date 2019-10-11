const cropper = document.querySelector('.cropper');
const circle = document.querySelector('circle');
const form = document.querySelector('.form');
const srcImage = document.querySelector('.src-image');
const image = document.querySelector('image');
const result = document.querySelector('.result');
const rangeInput = document.querySelector('.range-input');
const cropperCoords = getCoords(cropper);

cropper.addEventListener('mousedown', onMouseDown);
cropper.addEventListener('mousemove', onMouseMove);
cropper.addEventListener('mouseup', onMouseUp);

form.addEventListener('submit', addNewImage);
rangeInput.addEventListener('input', changeRange);

let isMouseDown = false;
let circleCoords = {};

function onMouseDown() {
    isMouseDown = true;
}
function onMouseUp() {
    isMouseDown = false;
    setResultImage(circleCoords);
}
function setResultImage(circleCoords) {
    const x = Math.round(circleCoords.x * 100/ 400);
    const y = Math.round(circleCoords.y * 100 / 400);

    result.style.backgroundPosition = `${x}% ${y}%`;
}

function onMouseMove(e) {
    if (!isMouseDown) return;
    circleCoords = {
        x: e.clientX - cropperCoords.left,
        y: e.clientY - cropperCoords.top,
    };

    circle.setAttribute('cx', circleCoords.x);
    circle.setAttribute('cy', circleCoords.y);
    setResultImage(circleCoords);
}

function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

function addNewImage(e) {
    e.preventDefault();
    console.log(srcImage.value);
    const src = srcImage.value;
    if (!src) return;

    image.setAttribute('xlink:href', src);
    result.style.backgroundImage = `url(${src})`
}

function changeRange(e) {
    e.preventDefault();
    const range = Number(rangeInput.value) * 120 / 10;
    console.log(range);
    circle.setAttribute('r', String(range));
}
