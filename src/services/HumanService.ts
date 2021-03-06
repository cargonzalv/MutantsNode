import { allEqual } from '../utils';

class HumanService {
  dna: string[];
  repetitions = 0;
  constructor(dna: string[]) {
    if (dna.length === 0) {
      throw new Error('Invalid DNA');
    }
    this.dna = dna;
  }

  isMutant(): boolean {
    for (let y = 0; y < this.dna.length; y++) {
      for (let x = 0; x < this.dna[y].length; x++) {
        this.checkHorizontal(x, y);
        this.checkVertical(x, y);
        this.checkDiagonal1(x, y);
        this.checkDiagonal2(x, y);
        if (this.repetitions > 1) {
          return true; // We break the cycle, we don't need to go further if we already found out it's a mutant
        }
      }
    }
    return false;
  }

  // Checks horizontally for repeated nucleobases 3 rows right
  checkHorizontal(x: number, y: number): void {
    if (this.dna[y] && this.dna[y][x + 3]) {
      const sequenceBlock = [this.dna[y][x], this.dna[y][x + 1], this.dna[y][x + 2], this.dna[y][x + 3]];
      if (allEqual(sequenceBlock)) {
        this.repetitions++;
      }
    }
  }

  // Checks vertically for repeated nucleobases 3 columns down
  checkVertical(x: number, y: number): void {
    if (this.dna[y + 3] && this.dna[y + 3][x]) {
      const sequenceBlock = [this.dna[y][x], this.dna[y + 1][x], this.dna[y + 2][x], this.dna[y + 3][x]];
      if (allEqual(sequenceBlock)) {
        this.repetitions++;
      }
    }
  }

  // Checks diagonally for repeated nucleobases 3 rows down and right
  checkDiagonal1(x: number, y: number): void {
    if (this.dna[y + 3] && this.dna[y + 3][x + 3]) {
      const sequenceBlock = [this.dna[y][x], this.dna[y + 1][x + 1], this.dna[y + 2][x + 2], this.dna[y + 3][x + 3]];
      if (allEqual(sequenceBlock)) {
        this.repetitions++;
      }
    }
  }

  // Checks diagonally for repeated nucleobases 3 rows down and left
  checkDiagonal2(x: number, y: number): void {
    if (this.dna[y + 3] && this.dna[y + 3][x - 3]) {
      const sequenceBlock = [this.dna[y][x], this.dna[y + 1][x - 1], this.dna[y + 2][x - 2], this.dna[y + 3][x - 3]];
      if (allEqual(sequenceBlock)) {
        this.repetitions++;
      }
    }
  }
}

export default HumanService;
