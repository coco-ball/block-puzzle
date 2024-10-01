export default class VerticalRectBlock {
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

  canMoveHorizontally(direction) {
    const { shape, position } = this.block;
    const offsetCol = direction === "right" ? 1 : -1;

    // console.log("canMoveHorizontally");
    // Check if all cells in the new position are empty
    return shape.every(([dx]) => {
      const newCol = position.col + offsetCol;
      const targetCell = this.board.querySelector(
        `td[data-row="${position.row + dx}"][data-col="${newCol}"]`
      );
      console.log(targetCell);
      return targetCell && !targetCell.classList.length;
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
