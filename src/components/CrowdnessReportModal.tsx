
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Star, Users, Timer, AlertCircle } from 'lucide-react';
import { Store, CrowdnessLevel } from '@/types/store';

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
    if (store && selectedLevel) {
      onReport(store.id, selectedLevel);
      setSelectedLevel(null);
    }
  };

  const handleClose = () => {
    setSelectedLevel(null);
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

        {/* Helper Text */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">정확한 제보를 위해 아래 기준을 참고해주세요:</p>
              <p>현재 상황을 가장 잘 설명하는 항목을 선택해주시면 됩니다.</p>
            </div>
          </div>
        </div>

        {/* Crowdness Options */}
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

        {/* Selected Details */}
        {selectedOption && (
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
            disabled={!selectedLevel}
            className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
          >
            <Timer className="w-4 h-4 mr-2" />
            제보하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CrowdnessReportModal;
