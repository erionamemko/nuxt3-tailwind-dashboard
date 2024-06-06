export interface travel {
  id: number;
  name: string;
  location: string;
  dates: {
    departure: string;
    return: string;
  };
  picture: string;
  description: string;
  price: number;
  averageRating: number;
}
