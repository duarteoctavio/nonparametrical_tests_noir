export interface User {
  id: number;
  walletAddress: string;
  createdAt: Date;
}

export interface UserSession {
  id: number;
  walletAddress: string;
}

export type WalletAuth = {
  walletAddress: string;
};
