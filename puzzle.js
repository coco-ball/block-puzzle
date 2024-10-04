import blocks from "./block.js";
import VerticalRectBlock from "./classes/verticalRectBlock.js";
import HorizontalRectBlock from "./classes/horizontalRectBlock.js";
import SmallSquareBlock from "./classes/smallSquareBlock.js";
import LargeSquareBlock from "./classes/largeSquareBlock.js";

export default class Puzzle {
  constructor() {
    this.R = 5; // row
    this.C = 4; // column
    this.board = document.querySelector(".board");
    this.blocks = [];
    this.selectedBlock = null; // 현재 선택된 블록
  }

  init() {
    this.makeBoard();
    this.makeBlock();
    this.renderBlock();
    this.addClickEvents();
    console.log(this.blocks);
  }

  makeBoard() {
    this.grid = [];
    for (let i = 0; i < this.R; i++) {
      this.grid.push("<tr>");
      for (let j = 0; j < this.C; j++) {
        // 좌표에 따라 색상 설정
        let backgroundColor = "";
        if (i % 2 === 0 && j % 2 === 0) {
          backgroundColor = "rgba(211, 208, 197, 0.7)";
        } else {
          backgroundColor = "rgba(215, 213, 205, 0.6)";
        }
        this.grid.push(
          `<td data-row="${i}" data-col="${j}" style="background-color: ${backgroundColor};"></td>`
        );
      }
      this.grid.push("</tr>");
    }
    this.board.innerHTML = this.grid.join("");
  }

  makeBlock() {
    this.blocks.push({
      type: "v1",
      shape: blocks.verticalRect,
      position: { row: 0, col: 0 },
    });
    this.blocks.push({
      type: "l1",
      shape: blocks.largeSquare,
      position: { row: 0, col: 1 },
    });
    this.blocks.push({
      type: "v2",
      shape: blocks.verticalRect,
      position: { row: 0, col: 3 },
    });
    this.blocks.push({
      type: "h1",
      shape: blocks.horizontalRect,
      position: { row: 2, col: 1 },
    });
    this.blocks.push({
      type: "v3",
      shape: blocks.verticalRect,
      position: { row: 3, col: 0 },
    });
    this.blocks.push({
      type: "s1",
      shape: blocks.smallSquare,
      position: { row: 3, col: 1 },
    });
    this.blocks.push({
      type: "s2",
      shape: blocks.smallSquare,
      position: { row: 3, col: 2 },
    });
    this.blocks.push({
      type: "s3",
      shape: blocks.smallSquare,
      position: { row: 4, col: 1 },
    });
    this.blocks.push({
      type: "s4",
      shape: blocks.smallSquare,
      position: { row: 4, col: 2 },
    });
    this.blocks.push({
      type: "v4",
      shape: blocks.verticalRect,
      position: { row: 3, col: 3 },
    });
  }

  renderBlock() {
    this.clearBoard();
    this.blocks.forEach((block) => {
      const { type, shape, position } = block;
      const { row, col } = position;

      shape.forEach(([dx, dy]) => {
        const x = row + dx;
        const y = col + dy;
        const targetCell = this.board.querySelector(
          `td[data-row="${x}"][data-col="${y}"]`
        );
        if (targetCell) {
          targetCell.classList.add(type); // 블록 종류에 따라 클래스 추가
        }
      });
    });
  }

  clearBoard() {
    const cells = this.board.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.className = ""; // 모든 셀의 클래스를 초기화
    });
  }

  addClickEvents() {
    const cells = this.board.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        const row = parseInt(cell.getAttribute("data-row"));
        const col = parseInt(cell.getAttribute("data-col"));
        console.log(`Cell clicked at row: ${row}, col: ${col}`);
        this.handleCellClick(row, col);
      });
    });
  }

  handleCellClick(row, col) {
    const clickedBlock = this.getBlockAt(row, col);

    if (this.selectedBlock) {
      if (!clickedBlock) {
        // 빈 공간 클릭 시
        if (this.isAdjacent(this.selectedBlock, row, col)) {
          const direction = this.getDirection(this.selectedBlock, row, col);
          console.log(direction);
          // VerticalRect인 경우
          if (this.selectedBlock.shape === blocks.verticalRect) {
            const verticalRectBlock = new VerticalRectBlock(
              this.selectedBlock,
              this.board
            );
            if (direction === "up" || direction === "down") {
              verticalRectBlock.moveVertically(row);
            } else if (direction === "left" || direction === "right") {
              if (verticalRectBlock.canMoveHorizontally(direction)) {
                verticalRectBlock.moveHorizontally(direction);
              }
            }
          }
          // HorizontalRect인 경우
          if (this.selectedBlock.shape === blocks.horizontalRect) {
            const horizontalRectBlock = new HorizontalRectBlock(
              this.selectedBlock,
              this.board
            );
            if (direction === "up" || direction === "down") {
              if (horizontalRectBlock.canMoveVertically(direction)) {
                horizontalRectBlock.moveVertically(direction);
              }
            } else if (direction === "left" || direction === "right") {
              horizontalRectBlock.moveHorizontally(col);
            }
          }
          // SmallSquare인 경우
          if (this.selectedBlock.shape === blocks.smallSquare) {
            const smallSquareBlock = new SmallSquareBlock(
              this.selectedBlock,
              this.board
            );
            if (direction === "up" || direction === "down") {
              smallSquareBlock.moveVertically(row);
            } else if (direction === "left" || direction === "right") {
              smallSquareBlock.moveHorizontally(col);
            }
          }
          // largeSquare인 경우
          if (this.selectedBlock.shape === blocks.largeSquare) {
            const largeSquareBlock = new LargeSquareBlock(
              this.selectedBlock,
              this.board
            );
            if (direction === "up" || direction === "down") {
              if (largeSquareBlock.canMoveVertically(direction)) {
                largeSquareBlock.moveVertically(direction);
              }
            } else if (direction === "left" || direction === "right") {
              if (largeSquareBlock.canMoveHorizontally(direction)) {
                largeSquareBlock.moveHorizontally(direction);
              }
            }
          }
        }
        this.selectedBlock = null; // 블록 이동 후 선택 해제
      } else {
        this.selectedBlock = clickedBlock; // 다른 블록 선택 시 변경
      }
    } else if (clickedBlock) {
      // 처음 클릭하면 블록을 선택
      this.selectedBlock = clickedBlock;
      console.log(this.selectedBlock);
    }
  }

  getBlockAt(row, col) {
    // 주어진 좌표에 있는 블록을 찾음
    return this.blocks.find((block) =>
      block.shape.some(
        ([dx, dy]) =>
          block.position.row + dx === row && block.position.col + dy === col
      )
    );
  }

  isAdjacent(block, targetRow, targetCol) {
    const { shape, position } = block;

    // shape 배열에 있는 모든 좌표를 기준으로 인접 여부를 확인
    return shape.some(([dx, dy]) => {
      const row = position.row + dx;
      const col = position.col + dy;

      // 상하좌우에 빈 공간이 있는지 확인
      return (
        (targetRow === row - 1 && targetCol === col) || // 위
        (targetRow === row + 1 && targetCol === col) || // 아래
        (targetRow === row && targetCol === col - 1) || // 왼쪽
        (targetRow === row && targetCol === col + 1) // 오른쪽
      );
    });
  }

  getDirection(block, targetRow, targetCol) {
    const { shape, position } = block;

    // 각 shape 좌표에 대해 빈 공간과의 상대적 위치를 계산
    for (let [dx, dy] of shape) {
      const row = position.row + dx;
      const col = position.col + dy;

      if (targetRow === row && targetCol > col) {
        return "right";
      }
      if (targetRow === row && targetCol < col) {
        return "left";
      }
      if (targetRow > row && targetCol === col) {
        return "down";
      }
      if (targetRow < row && targetCol === col) {
        return "up";
      }
    }

    return null; // 인접하지 않은 경우
  }
}
