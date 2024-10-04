import Puzzle from "./puzzle.js";
const puzzle = new Puzzle();

puzzle.init();

const credit = document.querySelector(".credit");
const instruction = document.querySelector(".instruction");
const boardContainer = document.querySelector(".board-container");
// const instructionBlocks = document.querySelector("#instruction-blocks");
// const instructionClick = document.querySelector("#instruction-click");
// const instructionGoal = document.querySelector("#instruction-goal");
let instructionNum = 0;

let elements = [credit, instruction, boardContainer];

//반응형마다 initial 순서가 다를 때 사용 - 지금은 필요 x
function getZIndex(element) {
  return parseInt(window.getComputedStyle(element).zIndex, 10) || 0;
}

function sortElementsByZIndex() {
  return elements.sort((a, b) => getZIndex(b) - getZIndex(a)); // z-index가 높은 순으로 정렬
}

// 초기 z-index 값을 가져와 배열을 정렬
document.addEventListener("DOMContentLoaded", function () {
  elements = sortElementsByZIndex();
});

// function getOpacity(el) {
//   return window.getComputedStyle(el).opacity;
// }

function removeFadein() {
  const instructionControl = document.querySelectorAll(".instruction-control");
  for (var i = 0; i < instructionControl.length; i++) {
    var item = instructionControl.item(i);
    item.classList.remove("fadein");
  }
}

//instruction click function
instruction.addEventListener("click", function () {
  //instruction이 맨 앞이 아닐 때
  if (elements[0] !== instruction) {
    bringToFront(instruction);
    boardContainer.addEventListener("click", handleBoardContainerClick);
  } else {
    //instruction이 맨 앞일 때
    let targetDiv = null;
    instructionNum += 1;

    switch (instructionNum % 4) {
      case 0:
        targetDiv = null;
        break;
      case 1:
        targetDiv = document.querySelector("#instruction-blocks");
        break;
      case 2:
        targetDiv = document.querySelector("#instruction-click");
        break;
      case 3:
        targetDiv = document.querySelector("#instruction-goal");
        break;
    }
    // console.log(targetDiv);
    removeFadein();
    //순서대로 fadein 추가
    if (instructionNum !== 0 && targetDiv !== null) {
      targetDiv.classList.add("fadein");
    }

    if (instructionNum === 4) {
      bringToFront(boardContainer);
    }
  }
});

//boardContainer click funtion
function handleBoardContainerClick() {
  if (elements[0] === boardContainer) {
    boardContainer.removeEventListener("click", handleBoardContainerClick);
  } else {
    bringToFront(boardContainer);
  }
}

//credit click function
credit.addEventListener("click", function () {
  if (elements[0] !== credit) {
    bringToFront(credit);
    boardContainer.addEventListener("click", handleBoardContainerClick);
  }
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
