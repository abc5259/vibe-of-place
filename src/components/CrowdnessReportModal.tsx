import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Clock, Star, Users, Timer, AlertCircle, Navigation, Shield } from 'lucide-react';
import { Store, CrowdnessLevel } from '@/types/store';
import { getMockUserLocation, validateLocationForReport } from '@/utils/locationUtils';

interface CrowdnessReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  store: Store | null;
  onReport: (storeId: string, level: CrowdnessLevel) => void;
}

const CrowdnessReportModal: React.FC<CrowdnessReportModalProps> = ({
  isOpen,
  onClose,
  store,
  onReport
}) => {
  const [selectedLevel, setSelectedLevel] = useState<CrowdnessLevel | null>(null);
  const [locationValidation, setLocationValidation] = useState<{
    isValid: boolean;
    reason?: string;
    distance: number;
    maxAllowedDistance: number;
    userLocation: { lat: number; lng: number; accuracy: number };
  } | null>(null);
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);

  useEffect(() => {
    if (isOpen && store) {
      checkLocationForReport();
    }
  }, [isOpen, store]);

  const checkLocationForReport = async () => {
    if (!store) return;
    
    setIsCheckingLocation(true);
    
    // 실제 위치 확인을 시뮬레이션하기 위해 약간의 지연 추가
    setTimeout(() => {
      const userLocation = getMockUserLocation();
      const validation = validateLocationForReport(userLocation, store.coordinates);
      
      setLocationValidation({
        ...validation,
        userLocation
      });
      setIsCheckingLocation(false);
    }, 1000);
  };

  const getLocationTypeText = (locationType: string) => {
    switch (locationType) {
      case 'store': return '가게';
      case 'street': return '거리';
      case 'park': return '공원';
      case 'station': return '역';
      case 'mall': return '쇼핑몰';
      case 'plaza': return '광장';
      case 'attraction': return '명소';
      default: return '장소';
    }
  };

  const crowdnessOptions = [
    {
      level: 'low' as CrowdnessLevel,
      emoji: '😊',
      title: '여유로워요',
      shortDesc: '대기 없이 바로 이용 가능',
      criteria: [
        '자리가 충분히 있음 (70% 이하)',
        '대기시간 없음 (즉시 이용)',
        '사람들 간격이 넉넉함',
        '소음이 적고 조용함'
      ],
      examples: {
        store: '빈 테이블이 많고 주문 즉시 가능',
        street: '사람이 드물고 걷기 편함',
        park: '벤치나 잔디밭에 여유 공간',
        station: '개찰구나 플랫폼이 한산함'
      },
      color: 'bg-green-500 hover:bg-green-600 border-green-300',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      level: 'medium' as CrowdnessLevel,
      emoji: '😐',
      title: '적당해요',
      shortDesc: '약간의 대기나 혼잡함',
      criteria: [
        '자리가 절반 정도 찬 상태 (70-85%)',
        '5-15분 정도 대기 시간',
        '사람들이 적당히 있음',
        '일반적인 소음 수준'
      ],
      examples: {
        store: '몇 개 테이블은 비어있고 짧은 대기',
        street: '사람들이 있지만 걷기 불편하지 않음',
        park: '이용자들이 있지만 공간 확보 가능',
        station: '사람들이 있지만 이동에 지장 없음'
      },
      color: 'bg-orange-500 hover:bg-orange-600 border-orange-300',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      level: 'high' as CrowdnessLevel,
      emoji: '😰',
      title: '혼잡해요',
      shortDesc: '많은 대기시간과 불편함',
      criteria: [
        '자리가 거의 다 참 (85% 이상)',
        '15분 이상 대기 필요',
        '사람들로 가득 참',
        '시끄럽고 복잡함'
      ],
      examples: {
        store: '웨이팅이 길고 자리 찾기 어려움',
        street: '사람이 많아 걷기 불편함',
        park: '이용자가 많아 공간 확보 어려움',
        station: '사람이 많아 이동이 불편함'
      },
      color: 'bg-red-500 hover:bg-red-600 border-red-300',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    }
  ];

  const handleReport = () => {
    if (store && selectedLevel && locationValidation?.isValid) {
      onReport(store.id, selectedLevel);
      setSelectedLevel(null);
    }
  };

  const handleClose = () => {
    setSelectedLevel(null);
    setLocationValidation(null);
    onClose();
  };

  if (!store) return null;

  const selectedOption = crowdnessOptions.find(option => option.level === selectedLevel);
  const storeTypeText = getLocationTypeText(store.locationType);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">혼잡도 제보하기</DialogTitle>
          <DialogDescription>
            현재 이 {storeTypeText}의 혼잡한 정도를 정확히 알려주세요
          </DialogDescription>
        </DialogHeader>

        {/* Store Info */}
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{store.name}</h3>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{store.distance}m</span>
                  </div>
                  {store.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{store.rating}</span>
                    </div>
                  )}
                  {store.estimatedWaitTime && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{store.estimatedWaitTime}분</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Verification */}
        {isCheckingLocation && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Navigation className="w-5 h-5 text-blue-600 animate-pulse" />
                <div>
                  <p className="font-medium text-blue-900">위치 확인 중...</p>
                  <p className="text-sm text-blue-700">현재 위치와 장소의 거리를 확인하고 있습니다.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {locationValidation && !isCheckingLocation && (
          <Card className={`border-2 ${locationValidation.isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${locationValidation.isValid ? 'bg-green-100' : 'bg-red-100'}`}>
                  {locationValidation.isValid ? (
                    <Shield className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${locationValidation.isValid ? 'text-green-900' : 'text-red-900'}`}>
                    {locationValidation.isValid ? '위치 확인 완료' : '위치 확인 실패'}
                  </h4>
                  <p className={`text-sm ${locationValidation.isValid ? 'text-green-700' : 'text-red-700'}`}>
                    {locationValidation.isValid 
                      ? `현재 위치에서 ${locationValidation.distance}m 떨어져 있습니다. 제보가 가능합니다.`
                      : locationValidation.reason
                    }
                  </p>
                  <div className="mt-2 text-xs text-gray-600">
                    <p>GPS 정확도: ±{locationValidation.userLocation.accuracy}m</p>
                    <p>허용 범위: {locationValidation.maxAllowedDistance}m 이내</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Location Error Alert */}
        {locationValidation && !locationValidation.isValid && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              정확한 제보를 위해 해당 장소 근처에서만 제보가 가능합니다. 
              장소에 더 가까이 이동한 후 다시 시도해주세요.
            </AlertDescription>
          </Alert>
        )}

        {/* Helper Text - only show if location is valid */}
        {locationValidation?.isValid && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">정확한 제보를 위해 아래 기준을 참고해주세요:</p>
                <p>현재 상황을 가장 잘 설명하는 항목을 선택해주시면 됩니다.</p>
              </div>
            </div>
          </div>
        )}

        {/* Crowdness Options - only show if location is valid */}
        {locationValidation?.isValid && (
          <div className="space-y-3">
            {crowdnessOptions.map((option) => (
              <Card
                key={option.level}
                className={`cursor-pointer transition-all border-2 ${
                  selectedLevel === option.level
                    ? `${option.color} text-white shadow-lg`
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedLevel(option.level)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl flex-shrink-0">{option.emoji}</div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className={`font-bold text-lg ${selectedLevel === option.level ? 'text-white' : 'text-gray-900'}`}>
                          {option.title}
                        </h4>
                        <p className={`text-sm ${selectedLevel === option.level ? 'text-white/90' : 'text-gray-600'}`}>
                          {option.shortDesc}
                        </p>
                      </div>
                      
                      {/* Criteria */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <h5 className={`text-sm font-medium mb-2 ${selectedLevel === option.level ? 'text-white' : 'text-gray-700'}`}>
                            일반적인 기준:
                          </h5>
                          <ul className="space-y-1">
                            {option.criteria.map((criteria, index) => (
                              <li key={index} className={`text-xs flex items-start space-x-1 ${selectedLevel === option.level ? 'text-white/80' : 'text-gray-600'}`}>
                                <span className="w-1 h-1 rounded-full bg-current mt-1.5 flex-shrink-0"></span>
                                <span>{criteria}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className={`text-sm font-medium mb-2 ${selectedLevel === option.level ? 'text-white' : 'text-gray-700'}`}>
                            {storeTypeText} 기준 예시:
                          </h5>
                          <p className={`text-xs ${selectedLevel === option.level ? 'text-white/80' : 'text-gray-600'}`}>
                            {option.examples[store.locationType as keyof typeof option.examples] || option.examples.store}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Selected Details */}
        {selectedOption && locationValidation?.isValid && (
          <Card className={`${selectedOption.bgColor} border-2 ${selectedOption.color.split(' ')[2]}`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className={`w-4 h-4 ${selectedOption.textColor}`} />
                <span className={`font-medium ${selectedOption.textColor}`}>
                  선택하신 상태: {selectedOption.title}
                </span>
              </div>
              <p className={`text-sm ${selectedOption.textColor}`}>
                이 정보는 다른 사용자들이 방문 계획을 세우는데 도움이 됩니다.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            취소
          </Button>
          <Button 
            onClick={handleReport} 
            disabled={!selectedLevel || !locationValidation?.isValid || isCheckingLocation}
            className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 disabled:opacity-50"
          >
            <Timer className="w-4 h-4 mr-2" />
            {isCheckingLocation ? '위치 확인 중...' : '제보하기'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CrowdnessReportModal;
