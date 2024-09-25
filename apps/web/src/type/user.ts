export interface IUserSignUp {
  name: string;
  email: string;
  password: string;
  role: string;
  referredBy: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserState {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface IUserGetRegistration {
  organizerId?: number;
}

export interface IUserBuy {
  totalTicket?: number;
}

export interface IUserDeposit {
  saldo: number;
}

export interface IUserGetTiket {
  userId?: number;
}

export interface IStatistik {
  year: number;
  userId? : number
}
