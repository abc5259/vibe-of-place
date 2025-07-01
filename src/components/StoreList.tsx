
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star } from 'lucide-react';
import { Store, CrowdnessLevel } from '@/types/store';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface StoreListProps {
  stores: Store[];
  onReportCrowdness: (store: Store) => void;
}

const StoreList: React.FC<StoreListProps> = ({ stores, onReportCrowdness }) => {
  const getCrowdnessColor = (level: CrowdnessLevel) => {
    switch (level) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-orange-500';
      case 'high': return 'bg-red-500';
    }
  };

  const getCrowdnessText = (level: CrowdnessLevel) => {
    switch (level) {
      case 'low': return '널널 😊';
      case 'medium': return '보통 😐';
      case 'high': return '혼잡 😰';
    }
  };

  const getCrowdnessEmoji = (level: CrowdnessLevel) => {
    switch (level) {
      case 'low': return '😊';
      case 'medium': return '😐';
      case 'high': return '😰';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">주변 가게 ({stores.length}개)</h2>
        <div className="text-sm text-gray-600">
          최근 업데이트: {formatDistanceToNow(new Date(), { addSuffix: true, locale: ko })}
        </div>
      </div>

      {stores.map((store) => (
        <Card key={store.id} className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {store.category}
                  </Badge>
                  {store.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{store.rating}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{store.distance}m</span>
                  </div>
                  {store.estimatedWaitTime && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>약 {store.estimatedWaitTime}분 대기</span>
                    </div>
                  )}
                  {store.priceRange && (
                    <span className="font-medium">{store.priceRange}</span>
                  )}
                </div>

                <p className="text-sm text-gray-500 mb-3">{store.address}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getCrowdnessColor(store.crowdnessLevel)}`}>
                      {getCrowdnessText(store.crowdnessLevel)}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(store.lastUpdated, { addSuffix: true, locale: ko })} 업데이트
                    </span>
                  </div>
                  
                  <Button 
                    onClick={() => onReportCrowdness(store)}
                    variant="outline"
                    size="sm"
                    className="hover:bg-blue-50 hover:border-blue-300"
                  >
                    제보하기
                  </Button>
                </div>
              </div>
              
              <div className="ml-4 text-4xl">
                {getCrowdnessEmoji(store.crowdnessLevel)}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StoreList;
