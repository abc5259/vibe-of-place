
import { Store, CrowdnessLevel, HourlyData, LocationType } from '@/types/store';

const getRandomCrowdnessLevel = (): CrowdnessLevel => {
  const levels: CrowdnessLevel[] = ['low', 'medium', 'high'];
  return levels[Math.floor(Math.random() * levels.length)];
};

const generateHourlyData = (locationType: LocationType): HourlyData[] => {
  const hourlyData: HourlyData[] = [];
  
  for (let hour = 0; hour < 24; hour++) {
    let crowdnessValue: number;
    let crowdnessLevel: CrowdnessLevel;
    
    // 장소 유형별로 다른 혼잡도 패턴 적용
    switch (locationType) {
      case 'store':
        // 가게: 식사 시간대에 혼잡
        if ((hour >= 7 && hour <= 9) || (hour >= 12 && hour <= 14) || (hour >= 18 && hour <= 20)) {
          crowdnessValue = Math.floor(Math.random() * 40) + 60;
        } else if (hour >= 22 || hour <= 6) {
          crowdnessValue = Math.floor(Math.random() * 30) + 0;
        } else {
          crowdnessValue = Math.floor(Math.random() * 50) + 25;
        }
        break;
      
      case 'street':
      case 'plaza':
        // 거리/광장: 출퇴근 시간과 저녁 시간대에 혼잡
        if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19) || (hour >= 19 && hour <= 22)) {
          crowdnessValue = Math.floor(Math.random() * 40) + 50;
        } else if (hour >= 23 || hour <= 6) {
          crowdnessValue = Math.floor(Math.random() * 20) + 0;
        } else {
          crowdnessValue = Math.floor(Math.random() * 40) + 30;
        }
        break;
      
      case 'park':
        // 공원: 아침, 저녁 산책 시간대에 혼잡
        if ((hour >= 6 && hour <= 8) || (hour >= 18 && hour <= 20)) {
          crowdnessValue = Math.floor(Math.random() * 50) + 40;
        } else if (hour >= 22 || hour <= 5) {
          crowdnessValue = Math.floor(Math.random() * 15) + 0;
        } else {
          crowdnessValue = Math.floor(Math.random() * 40) + 20;
        }
        break;
      
      case 'station':
        // 지하철역: 출퇴근 시간대에 매우 혼잡
        if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
          crowdnessValue = Math.floor(Math.random() * 30) + 70;
        } else if (hour >= 23 || hour <= 5) {
          crowdnessValue = Math.floor(Math.random() * 20) + 0;
        } else {
          crowdnessValue = Math.floor(Math.random() * 50) + 30;
        }
        break;
      
      case 'mall':
        // 쇼핑몰: 주말 낮 시간과 저녁 시간대에 혼잡
        if ((hour >= 11 && hour <= 14) || (hour >= 18 && hour <= 21)) {
          crowdnessValue = Math.floor(Math.random() * 40) + 60;
        } else if (hour >= 22 || hour <= 9) {
          crowdnessValue = Math.floor(Math.random() * 30) + 0;
        } else {
          crowdnessValue = Math.floor(Math.random() * 50) + 25;
        }
        break;
      
      default:
        crowdnessValue = Math.floor(Math.random() * 60) + 20;
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
  // 기존 가게들
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
    locationType: 'store',
    hourlyData: generateHourlyData('store')
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
    locationType: 'store',
    hourlyData: generateHourlyData('store')
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
    locationType: 'store',
    hourlyData: generateHourlyData('store')
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
    locationType: 'store',
    hourlyData: generateHourlyData('store')
  },
  
  // 새로 추가된 장소들
  {
    id: '9',
    name: '강남역 지하상가',
    category: '쇼핑거리',
    address: '서울 강남구 강남대로 지하',
    distance: 50,
    crowdnessLevel: getRandomCrowdnessLevel(),
    lastUpdated: new Date(),
    coordinates: { lat: 37.4981, lng: 127.0276 },
    locationType: 'street',
    description: '강남역 지하 쇼핑몰과 연결된 지하상가',
    hourlyData: generateHourlyData('street')
  },
  {
    id: '10',
    name: '선릉공원',
    category: '공원',
    address: '서울 강남구 선릉로 100길',
    distance: 800,
    crowdnessLevel: getRandomCrowdnessLevel(),
    lastUpdated: new Date(),
    coordinates: { lat: 37.5045, lng: 127.0487 },
    locationType: 'park',
    description: '조선왕릉과 함께 있는 도심 속 휴식공간',
    hourlyData: generateHourlyData('park')
  },
  {
    id: '11',
    name: '강남역 2호선',
    category: '지하철역',
    address: '서울 강남구 강남대로 지하',
    distance: 0,
    crowdnessLevel: getRandomCrowdnessLevel(),
    lastUpdated: new Date(),
    coordinates: { lat: 37.4979, lng: 127.0276 },
    locationType: 'station',
    description: '서울지하철 2호선 강남역 승강장',
    hourlyData: generateHourlyData('station')
  },
  {
    id: '12',
    name: '강남역 9번 출구 앞',
    category: '거리',
    address: '서울 강남구 강남대로 지상',
    distance: 20,
    crowdnessLevel: getRandomCrowdnessLevel(),
    lastUpdated: new Date(),
    coordinates: { lat: 37.4980, lng: 127.0275 },
    locationType: 'street',
    description: '유동인구가 많은 강남역 메인 출구',
    hourlyData: generateHourlyData('street')
  },
  {
    id: '13',
    name: '강남 지하쇼핑센터',
    category: '쇼핑몰',
    address: '서울 강남구 강남대로 지하 396',
    distance: 100,
    crowdnessLevel: getRandomCrowdnessLevel(),
    lastUpdated: new Date(),
    coordinates: { lat: 37.4978, lng: 127.0277 },
    locationType: 'mall',
    description: '강남역과 연결된 대형 지하쇼핑센터',
    hourlyData: generateHourlyData('mall')
  },
  {
    id: '14',
    name: '강남역 광장',
    category: '광장',
    address: '서울 강남구 강남대로 지상',
    distance: 30,
    crowdnessLevel: getRandomCrowdnessLevel(),
    lastUpdated: new Date(),
    coordinates: { lat: 37.4981, lng: 127.0274 },
    locationType: 'plaza',
    description: '만남의 장소로 유명한 강남역 지상 광장',
    hourlyData: generateHourlyData('plaza')
  },

  // 기존 나머지 가게들
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
    locationType: 'store',
    hourlyData: generateHourlyData('store')
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
    locationType: 'store',
    hourlyData: generateHourlyData('store')
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
    locationType: 'store',  
    hourlyData: generateHourlyData('store')
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
    locationType: 'store',
    hourlyData: generateHourlyData('store')
  }
];
