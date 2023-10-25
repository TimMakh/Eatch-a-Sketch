let grid = document.querySelector(".div__grid");
let gridValue = document.querySelector(".main__size");
let gridSize = document.querySelector(".main__size-value");
let clear = document.querySelector(".main__clear");
let colorMode = document.querySelector(".main__color-mode");
let raindowMode = document.querySelector(".main__rainbow-mode");
let eraser = document.querySelector(".main__eraser");
let defaultSize = 16;
let currentSize = defaultSize;
let currentColor = "black";
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function setCurrentSize(newSize) {
  defaultSize = newSize;
}

function createDiv(size) {
  let div = document.createElement("div");
  div.classList.add("box");
  div.style.width = size + "px";
  div.style.height = size + "px";
  div.style.outline = "2px solid #e3c2ff";
  div.style.outlineOffset = "-1px";
  div.style.backgroundColor = "white";
  div.addEventListener("mouseover", changeColor);
  div.addEventListener("mousedown", changeColor);
  return div;
}

function createGrid(gridSize) {
  for (let i = 0; i < gridSize; i++) {
    for (let n = 0; n < gridSize; n++) {
      grid.appendChild(createDiv(grid.clientWidth / gridSize));
    }
  }
}
gridSize.addEventListener("input", function (e) {
  currentSize = e.target.value;
  gridValue.textContent = `${currentSize}x${currentSize}`;
  reset(gridSize);
});

function reset() {
  while (grid.firstChild) {
    grid.removeChild(grid.lastChild);
  }
  createGrid(currentSize);
}

clear.addEventListener("click", function (e) {
  reset(currentSize);
});

raindowMode.addEventListener("click", function (e) {
  currentColor = "rainbow";
});

colorMode.addEventListener("click", function (e) {
  currentColor = "black";
});

eraser.addEventListener("click", function (e) {
  currentColor = "eraser";
});

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentColor === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentColor === "black") {
    e.target.style.backgroundColor = "black";
  } else if (currentColor === "eraser") {
    e.target.style.backgroundColor = "#fefefe";
  }
}

createGrid(defaultSize);
