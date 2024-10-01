import Puzzle from "./puzzle.js";
const puzzle = new Puzzle();

puzzle.init();

const credit = document.querySelector(".credit");
const instruction = document.querySelector(".instruction");
const boardContainer = document.querySelector(".board-container");

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

function handleBoardContainerClick() {
  if (elements[0] === boardContainer) {
    boardContainer.removeEventListener("click", handleBoardContainerClick);
  } else {
    bringToFront(boardContainer);
  }
}

if (elements[0] !== boardContainer) {
  boardContainer.addEventListener("click", handleBoardContainerClick);
}

instruction.addEventListener("click", function () {
  if (elements[0] === instruction) {
    bringToFront(boardContainer);
  } else {
    bringToFront(instruction);
  }
});
credit.addEventListener("click", function () {
  bringToFront(credit);
});

function bringToFront(clickedElement) {
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

  console.log(sortedElements);

  // 애니메이션이 끝난 후 'show' 클래스를 제거 (1.5초 후)
  setTimeout(() => {
    clickedElement.classList.remove("show");
    elements = sortElementsByZIndex(); // elements 배열을 다시 정렬하여 최신화
    console.log(elements);
  }, 1500);
}

function animateExample() {
  const exampleBlock = document.querySelectorAll(".instruction-example-block");
  const exampleBlank = document.querySelector(".instruction-example-blank");

  // 1초 후 첫 번째와 두 번째 instruction-example-block의 opacity를 50%로 변경
  setTimeout(() => {
    exampleBlock.forEach((block) => {
      block.style.opacity = 0.5;
    });
  }, 1000);

  // 2초 후 instruction-example-blank의 opacity를 50%로 변경
  setTimeout(() => {
    exampleBlank.style.opacity = 0.5;
  }, 2000);

  // 3초 후 모든 블록의 opacity를 100%로 변경하고, blankBlock을 맨 앞으로 이동
  setTimeout(() => {
    exampleBlock.forEach((block) => {
      block.style.opacity = 1;
    });
    exampleBlank.style.opacity = 1;

    // blankBlock을 맨 앞으로 이동 (순서를 가장 앞쪽으로)
    exampleBlank.style.order = -1;
  }, 3000);
}

// 페이지가 로드된 후 애니메이션을 시작
document.addEventListener("DOMContentLoaded", animateExample);
