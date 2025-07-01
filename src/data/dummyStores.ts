
import { Store, CrowdnessLevel, HourlyData } from '@/types/store';

const getRandomCrowdnessLevel = (): CrowdnessLevel => {
  const levels: CrowdnessLevel[] = ['low', 'medium', 'high'];
  return levels[Math.floor(Math.random() * levels.length)];
};

const generateHourlyData = (): HourlyData[] => {
  const hourlyData: HourlyData[] = [];
  
  for (let hour = 0; hour < 24; hour++) {
    let crowdnessValue: number;
    let crowdnessLevel: CrowdnessLevel;
    
    // 식사 시간대 (7-9, 12-14, 18-20)에 더 혼잡하게 설정
    if ((hour >= 7 && hour <= 9) || (hour >= 12 && hour <= 14) || (hour >= 18 && hour <= 20)) {
      crowdnessValue = Math.floor(Math.random() * 40) + 60; // 60-100
    } else if (hour >= 22 || hour <= 6) {
      crowdnessValue = Math.floor(Math.random() * 30) + 0; // 0-30
    } else {
      crowdnessValue = Math.floor(Math.random() * 50) + 25; // 25-75
    }
    
    if (crowdnessValue < 33) {
      crowdnessLevel = 'low';
    } else if (crowdnessValue < 67) {
      crowdnessLevel = 'medium';
    } else {
      crowdnessLevel = 'high';
    }
    
    hourlyData.push({
      hour,
      crowdnessLevel,
      crowdnessValue
    });
  }
  
  return hourlyData;
};

export const dummyStores: Store[] = [
  {
    id: '1',
    name: '스타벅스 강남역점',
    category: '카페',
    address: '서울 강남구 강남대로 지하 396',
    distance: 150,
    crowdnessLevel: getRandomCrowdnessLevel(),
    lastUpdated: new Date(),
    coordinates: { lat: 37.4979, lng: 127.0276 },
    rating: 4.2,
    priceRange: '₩₩',
    estimatedWaitTime: 5,
    hourlyData: generateHourlyData()
  },
  {
    id: '2',
    name: '맥도날드 강남역점',
    category: '패스트푸드',
    address: '서울 강남구 강남대로 390',
    distance: 200,
    crowdnessLevel: getRandomCrowdnessLevel(),
    lastUpdated: new Date(),
    coordinates: { lat: 37.4977, lng: 127.0278 },
    rating: 4.0,
    priceRange: '₩',
    estimatedWaitTime: 3,
    hourlyData: generateHourlyData()
  },
  {
    id: '3',
    name: '본죽&비빔밥 강남역점',
    category: '한식',
    address: '서울 강남구 강남대로 지하 398',
    distance: 120,
    crowdnessLevel: getRandomCrowdnessLevel(),
    lastUpdated: new Date(),
    coordinates: { lat: 37.4982, lng: 127.0274 },
    rating: 4.1,
    priceRange: '₩₩',
    estimatedWaitTime: 8,
    hourlyData: generateHourlyData()
  },
  {
    id: '4',
    name: '이디야커피 강남역점',
    category: '카페',
    address: '서울 강남구 테헤란로 지하 145',
    distance: 180,
    crowdnessLevel: getRandomCrowdnessLevel(),
    lastUpdated: new Date(),
    coordinates: { lat: 37.4975, lng: 127.0280 },
    rating: 3.9,
    priceRange: '₩',
    estimatedWaitTime: 2,
    hourlyData: generateHourlyData()
  },
  {
    id: '5',
    name: '백종원의 본가',
    category: '한식',
    address: '서울 강남구 강남대로 392',
    distance: 250,
    crowdnessLevel: getRandomCrowdnessLevel(),
    lastUpdated: new Date(),
    coordinates: { lat: 37.4984, lng: 127.0272 },
    rating: 4.5,
    priceRange: '₩₩₩',
    estimatedWaitTime: 15,
    hourlyData: generateHourlyData()
  },
  {
    id: '6',
    name: '투썸플레이스 강남역점',
    category: '카페',
    address: '서울 강남구 강남대로 지하 지하 1층',
    distance: 90,
    crowdnessLevel: getRandomCrowdnessLevel(),
    lastUpdated: new Date(),
    coordinates: { lat: 37.4980, lng: 127.0275 },
    rating: 4.3,
    priceRange: '₩₩',
    estimatedWaitTime: 7,
    hourlyData: generateHourlyData()
  },
  {
    id: '7',
    name: '김밥천국 강남역점',
    category: '분식',
    address: '서울 강남구 강남대로 지하 400',
    distance: 300,
    crowdnessLevel: getRandomCrowdnessLevel(),
    lastUpdated: new Date(),
    coordinates: { lat: 37.4976, lng: 127.0282 },
    rating: 3.8,
    priceRange: '₩',
    estimatedWaitTime: 5,
    hourlyData: generateHourlyData()
  },
  {
    id: '8',
    name: '파리바게뜨 강남역점',
    category: '베이커리',
    address: '서울 강남구 테헤란로 지하 147',
    distance: 160,
    crowdnessLevel: getRandomCrowdnessLevel(),
    lastUpdated: new Date(),
    coordinates: { lat: 37.4978, lng: 127.0277 },
    rating: 4.0,
    priceRange: '₩',
    estimatedWaitTime: 1,
    hourlyData: generateHourlyData()
  }
];
