const canvas = document.getElementById("drawing-board");
const ctx = canvas.getContext("2d");

// Set canvas size to fit the screen
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.8;

// Brush settings
let drawing = false;
let brushColor = "#000000";
let brushSize = 5;

// Get toolbar elements
const colorPicker = document.getElementById("color");
const sizePicker = document.getElementById("size");
const clearButton = document.getElementById("clear");

// Event listeners for toolbar
colorPicker.addEventListener("input", (e) => {
    brushColor = e.target.value;
});

sizePicker.addEventListener("input", (e) => {
    brushSize = parseInt(e.target.value);
});

clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Start drawing
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

// Touch support
canvas.addEventListener("touchstart", (e) => startDrawing(e.touches[0]));
canvas.addEventListener("touchmove", (e) => {
    draw(e.touches[0]);
    e.preventDefault(); // Prevent scrolling
});
canvas.addEventListener("touchend", stopDrawing);

// Functions
function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(getX(e), getY(e));
}

function draw(e) {
    if (!drawing) return;

    ctx.lineTo(getX(e), getY(e));
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.stroke();
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

function getX(e) {
    return e.clientX - canvas.offsetLeft;
}

function getY(e) {
    return e.clientY - canvas.offsetTop;
}
