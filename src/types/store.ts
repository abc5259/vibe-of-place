
export type CrowdnessLevel = 'low' | 'medium' | 'high';

export interface Store {
  id: string;
  name: string;
  category: string;
  address: string;
  distance: number; // meters
  crowdnessLevel: CrowdnessLevel;
  lastUpdated: Date;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating?: number;
  priceRange?: string;
  estimatedWaitTime?: number; // minutes
}
