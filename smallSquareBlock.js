export default class smallSquareBlock {
  constructor(block, board) {
    this.block = block;
    this.board = board;
  }

  moveVertically(targetRow) {
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
    if (targetRow < position.row) {
      this.block.position.row -= 1;
    } else if (targetRow > position.row) {
      this.block.position.row += 1;
    }

    // Render the block in its new position
    this.renderBlock();
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
