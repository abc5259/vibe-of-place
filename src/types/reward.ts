
export interface UserPoints {
  userId: string;
  totalPoints: number;
  earnedToday: number;
  lastEarnedAt: Date;
}

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: 'food' | 'beverage' | 'shopping' | 'entertainment';
  brand: string;
  imageUrl?: string;
  isAvailable: boolean;
  stock?: number;
}

export interface PointsTransaction {
  id: string;
  userId: string;
  type: 'earn' | 'spend';
  points: number;
  reason: string;
  timestamp: Date;
  relatedStoreId?: string;
}
