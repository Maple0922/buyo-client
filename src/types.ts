export interface Reservation {
  id: number;
  name: string;
  time: {
    start: string;
    end: string;
  };
}

export interface Day {
  date: string;
  reservations: Reservation[];
}
