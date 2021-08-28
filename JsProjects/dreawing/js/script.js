const canvas = document.getElementById('canvas');
const increase = document.getElementById('increase');
const decrease = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearBtn = document.getElementById('clear'); 

const ctx = canvas.getContext('2d');

let size = 10;
let x = undefined;
let y = undefined;

let isDown = false;

let color = 'black';

canvas.addEventListener('mousedown', (e) => {
    isDown = true;
    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
    isDown = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
    if(isDown) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

increase.addEventListener('click', (e) => {
    size += 1;
    if(size > 50) {
        size = 50;
    }
    updateCanvasSize();
});
decrease.addEventListener('click', (e) => {
    size -= 1;
    if(size < 1) {
        size = 1;
    }
    updateCanvasSize();
});

function drawCircle(x, y){
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.fillStyle = color;
    ctx.fill();
}

colorEl.addEventListener('change', (e) => {
    color = e.target.value;
});

function updateCanvasSize() {
    sizeEl.innerText = size;
}

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});