
// 목 데이터 - 실제 GPS 위치 정보를 시뮬레이션
export const getMockUserLocation = (): { lat: number; lng: number; accuracy: number } => {
  // 강남역 근처의 목 위치 데이터 (실제로는 GPS에서 받아올 데이터)
  const mockLocations = [
    { lat: 37.4981, lng: 127.0276, accuracy: 5 },   // 정확한 위치 (5m 오차)
    { lat: 37.4979, lng: 127.0278, accuracy: 15 },  // 약간 부정확한 위치 (15m 오차)
    { lat: 37.4975, lng: 127.0280, accuracy: 45 },  // 부정확한 위치 (45m 오차)
    { lat: 37.4985, lng: 127.0270, accuracy: 80 },  // 매우 부정확한 위치 (80m 오차)
  ];
  
  // 랜덤하게 목 위치 중 하나를 선택
  return mockLocations[Math.floor(Math.random() * mockLocations.length)];
};

// 두 지점 간의 거리 계산 (하버사인 공식)
export const calculateDistance = (
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number => {
  const R = 6371e3; // 지구 반지름 (미터)
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lng2 - lng1) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // 거리 (미터)
};

// 위치 검증 함수
export const validateLocationForReport = (
  userLocation: { lat: number; lng: number; accuracy: number },
  storeLocation: { lat: number; lng: number }
): { isValid: boolean; reason?: string; distance: number; maxAllowedDistance: number } => {
  const distance = calculateDistance(
    userLocation.lat, 
    userLocation.lng, 
    storeLocation.lat, 
    storeLocation.lng
  );
  
  // GPS 정확도에 따른 최대 허용 거리 설정
  const baseMaxDistance = 50; // 기본 50m
  const accuracyMultiplier = 2; // 정확도 오차의 2배까지 허용
  const maxAllowedDistance = baseMaxDistance + (userLocation.accuracy * accuracyMultiplier);
  
  if (distance > maxAllowedDistance) {
    return {
      isValid: false,
      reason: `현재 위치에서 너무 멀리 떨어져 있습니다. (${Math.round(distance)}m 떨어짐, 최대 ${Math.round(maxAllowedDistance)}m 허용)`,
      distance: Math.round(distance),
      maxAllowedDistance: Math.round(maxAllowedDistance)
    };
  }
  
  return {
    isValid: true,
    distance: Math.round(distance),
    maxAllowedDistance: Math.round(maxAllowedDistance)
  };
};
