
import { RewardItem } from '@/types/reward';

export const rewardItems: RewardItem[] = [
  {
    id: 'starbucks-americano',
    name: '스타벅스 아메리카노',
    description: '스타벅스 아메리카노 Tall 사이즈 쿠폰',
    pointsCost: 500,
    category: 'beverage',
    brand: '스타벅스',
    isAvailable: true,
    stock: 100
  },
  {
    id: 'starbucks-latte',
    name: '스타벅스 카페라떼',
    description: '스타벅스 카페라떼 Tall 사이즈 쿠폰',
    pointsCost: 600,
    category: 'beverage',
    brand: '스타벅스',
    isAvailable: true,
    stock: 50
  },
  {
    id: 'gifticon-chicken',
    name: '치킨 기프티콘',
    description: 'BBQ 황금올리브 치킨 쿠폰',
    pointsCost: 2000,
    category: 'food',
    brand: 'BBQ',
    isAvailable: true,
    stock: 30
  },
  {
    id: 'cu-voucher',
    name: 'CU 편의점 상품권',
    description: '5,000원 상당 CU 편의점 상품권',
    pointsCost: 1000,
    category: 'shopping',
    brand: 'CU',
    isAvailable: true,
    stock: 200
  },
  {
    id: 'cgv-ticket',
    name: 'CGV 영화 관람권',
    description: 'CGV 영화 관람권 (2D 일반)',
    pointsCost: 1500,
    category: 'entertainment',
    brand: 'CGV',
    isAvailable: true,
    stock: 20
  },
  {
    id: 'baskin-robbins',
    name: '배스킨라빈스 아이스크림',
    description: '배스킨라빈스 파인트 아이스크림 쿠폰',
    pointsCost: 800,
    category: 'food',
    brand: '배스킨라빈스',
    isAvailable: true,
    stock: 60
  }
];
