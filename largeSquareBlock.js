export default class LargeSquareBlock {
  constructor(block, board) {
    this.block = block;
    this.board = board;
  }

  canMoveVertically(direction) {
    const { shape, position } = this.block;

    // 블록의 위/아래 부분을 기준으로 이동하려는 위치의 셀들 확인
    const checkRow =
      direction === "down"
        ? Math.max(...shape.map(([dx]) => dx)) + 1 // 아래로 이동할 때는 가장 아래 행 기준
        : Math.min(...shape.map(([dx]) => dx)) - 1; // 위로 이동할 때는 가장 위 행 기준

    // 새 위치의 모든 셀이 빈 공간인지 확인
    return shape.every(([dy]) => {
      const newRow = position.row + checkRow; // 새로운 행 위치 (윗줄/아랫줄 기준)
      const newCol = position.col + dy; // 열 위치는 동일
      const targetCell = this.board.querySelector(
        `td[data-row="${newRow}"][data-col="${newCol}"]`
      );
      return targetCell && !targetCell.classList.length; // 해당 셀이 비어 있는지 확인
    });
  }

  moveVertically(direction) {
    const { shape, position } = this.block;
    const offsetRow = direction === "down" ? 1 : -1;

    // Clear the current block's cells
    shape.forEach(([dx, dy]) => {
      const x = position.row + dx;
      const y = position.col + dy;
      const targetCell = this.board.querySelector(
        `td[data-row="${x}"][data-col="${y}"]`
      );
      targetCell.className = ""; // Clear the cell
    });

    // Move the block
    this.block.position.row += offsetRow;

    // Render the block in its new position
    this.renderBlock();
  }

  canMoveHorizontally(direction) {
    const { shape, position } = this.block;

    // 블록의 위/아래 부분을 기준으로 이동하려는 위치의 셀들 확인
    const checkCol =
      direction === "right"
        ? Math.max(...shape.map(([dx]) => dx)) + 1 // 아래로 이동할 때는 가장 아래 행 기준
        : Math.min(...shape.map(([dx]) => dx)) - 1; // 위로 이동할 때는 가장 위 행 기준

    // 새 위치의 모든 셀이 빈 공간인지 확인
    return shape.every(([dx]) => {
      const newRow = position.row + dx; // 새로운 행 위치 (윗줄/아랫줄 기준)
      const newCol = position.col + checkCol; // 열 위치는 동일
      const targetCell = this.board.querySelector(
        `td[data-row="${newRow}"][data-col="${newCol}"]`
      );
      return targetCell && !targetCell.classList.length; // 해당 셀이 비어 있는지 확인
    });
  }

  moveHorizontally(direction) {
    const { shape, position } = this.block;
    const offsetCol = direction === "right" ? 1 : -1;

    // Clear the current block's cells
    shape.forEach(([dx, dy]) => {
      const x = position.row + dx;
      const y = position.col + dy;
      const targetCell = this.board.querySelector(
        `td[data-row="${x}"][data-col="${y}"]`
      );
      targetCell.className = ""; // Clear the cell
    });

    // Move the block
    this.block.position.col += offsetCol;

    // Render the block in its new position
    this.renderBlock();
  }

  renderBlock() {
    const { shape, position } = this.block;
    shape.forEach(([dx, dy]) => {
      const x = position.row + dx;
      const y = position.col + dy;
      const targetCell = this.board.querySelector(
        `td[data-row="${x}"][data-col="${y}"]`
      );
      if (targetCell) {
        targetCell.classList.add(this.block.type);
      }
    });
  }
}
