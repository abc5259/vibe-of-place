
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
import { MapPin, Clock, Star } from 'lucide-react';
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

  const crowdnessOptions = [
    {
      level: 'low' as CrowdnessLevel,
      emoji: '😊',
      title: '널널해요',
      description: '대기 없이 바로 이용 가능',
      color: 'bg-green-500 hover:bg-green-600 border-green-300',
      textColor: 'text-green-700'
    },
    {
      level: 'medium' as CrowdnessLevel,
      emoji: '😐',
      title: '보통이에요',
      description: '약간의 대기 시간 있음',
      color: 'bg-orange-500 hover:bg-orange-600 border-orange-300',
      textColor: 'text-orange-700'
    },
    {
      level: 'high' as CrowdnessLevel,
      emoji: '😰',
      title: '혼잡해요',
      description: '대기 시간이 길어요',
      color: 'bg-red-500 hover:bg-red-600 border-red-300',
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">혼잡도 제보하기</DialogTitle>
          <DialogDescription>
            현재 이 가게의 혼잡한 정도를 알려주세요
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

        {/* Crowdness Options */}
        <div className="space-y-3">
          {crowdnessOptions.map((option) => (
            <Card
              key={option.level}
              className={`cursor-pointer transition-all border-2 ${
                selectedLevel === option.level
                  ? `${option.color} text-white shadow-lg scale-105`
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedLevel(option.level)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{option.emoji}</div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${selectedLevel === option.level ? 'text-white' : 'text-gray-900'}`}>
                      {option.title}
                    </h4>
                    <p className={`text-sm ${selectedLevel === option.level ? 'text-white/90' : 'text-gray-600'}`}>
                      {option.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
            제보하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CrowdnessReportModal;
