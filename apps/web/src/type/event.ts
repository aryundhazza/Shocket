export interface IEvents {
  name: string;
  category: string;
  description: string;
  slug: string;
  price: number;
  dateTime: any;
  location: string;
  image: File | string | null;
  seatsAvailable: number;
  ticketTypes: string;
  isPaid?: boolean;
  organizerId: number;
}

export interface EventInput {
  name: string;
  category: string;
  description: string;
  slug: string;
  price: number;
  dateTime: any;
  location: string;
  image: File | string | null;
  seatsAvailable: number;
  ticketTypes: string;
  isPaid?: boolean;
  organizerId: number;
}

export interface EventInputProfile {
  email?: string;
  name?: string;
  avatar?: File | string | null;
}

export interface EventUpdate {
  name: string;
  category: string;
  description: string;
  slug: string;
  price: number;
  dateTime: any;
  location: string;
  seatsAvailable: number;
  ticketTypes: string;
  isPaid?: boolean;
  organizerId: number;
}

export interface EventInputDeposit {
  saldo: number;
}
