import type { Seat } from "../types/seat";

export const generateSeats = (): Seat[] => {
  const rows = 10;
  const seatsPerRow = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seats = [];

  for (let row = 1; row <= rows; row++) {
    for (const letter of seatsPerRow) {
      const seatId = `${row}${letter}`;
      const status = Math.random() < 0.3 ? "occupied" : "free";

      seats.push({
        id: seatId,
        row,
        letter,
        status,
      })
    }
  }

  return seats;
};
