import Puzzle from "./puzzle.js";
const puzzle = new Puzzle();

puzzle.init();

const credit = document.querySelector(".credit");
const instruction = document.querySelector(".instruction");
const boardContainer = document.querySelector(".board-container");
const instructionControl = document.querySelector(".instruction-control");

let elements = [credit, instruction, boardContainer];

// 각 div의 현재 z-index 값을 가져와 배열을 z-index 순으로 정렬
function getZIndex(element) {
  return parseInt(window.getComputedStyle(element).zIndex, 10) || 0;
}

function sortElementsByZIndex() {
  return elements.sort((a, b) => getZIndex(b) - getZIndex(a)); // z-index가 높은 순으로 정렬
}

document.addEventListener("DOMContentLoaded", function () {
  elements = sortElementsByZIndex(); // 초기 z-index 값을 가져와 배열을 정렬
});

// console.log(elements);

// elements.forEach((element) => {
//   element.addEventListener("click", function () {
//     bringToFront(element);
//   });
// });

function getOpacity(el) {
  return window.getComputedStyle(el).opacity;
}

function handleBoardContainerClick() {
  if (elements[0] === boardContainer) {
    boardContainer.removeEventListener("click", handleBoardContainerClick);
  } else {
    bringToFront(boardContainer);
  }
}

instruction.addEventListener("click", function () {
  if (getOpacity(instructionControl) === "0") {
    instructionControl.classList.add("fadein");
  } else {
    if (elements[0] === instruction) {
      bringToFront(boardContainer);
    } else {
      bringToFront(instruction);
      boardContainer.addEventListener("click", handleBoardContainerClick);
    }
  }
});
credit.addEventListener("click", function () {
  bringToFront(credit);
  boardContainer.addEventListener("click", handleBoardContainerClick);
});

function bringToFront(clickedElement) {
  console.log(elements);
  const newElements = [];
  const tempElements = [];
  for (let i = 0; i < 3; i++) {
    let element = elements[i];
    if (element === clickedElement) {
      newElements[0] = element;
    } else {
      tempElements.push(element);
    }
  }
  newElements.push(...tempElements);
  elements = newElements; // elements 배열을 다시 정렬하여 최신화
  console.log(elements);

  // 클릭된 요소가 가장 높은 z-index를 가짐
  clickedElement.style.zIndex = 3;
  clickedElement.classList.add("show");

  // 현재 z-index에 따라 나머지 두 요소의 z-index를 조정
  const sortedElements = sortElementsByZIndex();

  sortedElements
    .filter((el) => el !== clickedElement)
    .forEach((el, index) => {
      el.style.zIndex = 2 - index; // 2, 1 순서로 z-index 설정
      el.classList.remove("show");
    });

  // 애니메이션이 끝난 후 'show' 클래스를 제거 (1.5초 후)
  setTimeout(() => {
    clickedElement.classList.remove("show");
    elements = sortElementsByZIndex(); // elements 배열을 다시 정렬하여 최신화
    console.log(elements);
  }, 1500);
}
