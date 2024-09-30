export default class HorizontalRectBlock {
  constructor(block, board) {
    this.block = block;
    this.board = board;
  }

  moveHorizontally(targetCol) {
    const { shape, position } = this.block;

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
    if (targetCol < position.col) {
      this.block.position.col -= 1;
    } else if (targetCol > position.col) {
      this.block.position.col += 1;
    }

    // Render the block in its new position
    this.renderBlock();
  }

  canMoveVertically(direction) {
    const { shape, position } = this.block;
    const offsetRow = direction === "down" ? 1 : -1;

    // Check if all cells in the new vertical position are empty
    return shape.every(([dx, dy]) => {
      const newRow = position.row + offsetRow + dx; // dx로 각 셀의 행 계산
      const newCol = position.col + dy; // dy로 각 셀의 열 계산
      const targetCell = this.board.querySelector(
        `td[data-row="${newRow}"][data-col="${newCol}"]`
      );
      console.log(targetCell);
      // Check if target cell exists and is empty
      return targetCell && !targetCell.classList.length;
    });
  }

  // canMoveVertically(direction) {
  //   const { shape, position } = this.block;
  //   const offsetRow = direction === "down" ? 1 : -1;

  //   console.log(direction);
  //   return shape.every(([dy]) => {
  //     const newRow = position.row + offsetRow;
  //     const targetCell = this.board.querySelector(
  //       `td[data-row="${newRow}"][data-col="${position.col + dy}"]`
  //     );
  //     return targetCell && !targetCell.classList.length;
  //   });
  // }

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
