export interface User {
    id: string;
    username: string;
    email: string;
  }
  
  export interface AuctionItem {
    id: string;
    title: string;
    description: string;
    startingBid: number;
    currentBid: number;
    endDate: string;
    sellerId: string;
    seller: User;
    createdAt: string;
    updatedAt: string;
  }