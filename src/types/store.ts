
export type CrowdnessLevel = 'low' | 'medium' | 'high';

export interface HourlyData {
  hour: number;
  crowdnessLevel: CrowdnessLevel;
  crowdnessValue: number; // 0-100 scale for chart
}

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
  hourlyData?: HourlyData[]; // 24시간 혼잡도 데이터
}
