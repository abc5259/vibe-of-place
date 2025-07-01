import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from 'lucide-react';
import { Store, CrowdnessLevel } from '@/types/store';

interface StoreMapProps {
  stores: Store[];
  userLocation: { lat: number; lng: number } | null;
  onStoreSelect: (store: Store) => void;
  onStoreClick: (store: Store) => void;
}

const StoreMap: React.FC<StoreMapProps> = ({ stores, userLocation, onStoreSelect, onStoreClick }) => {
  const getCrowdnessColor = (level: CrowdnessLevel) => {
    switch (level) {
      case 'low': return 'bg-green-500 border-green-600';
      case 'medium': return 'bg-orange-500 border-orange-600';
      case 'high': return 'bg-red-500 border-red-600';
    }
  };

  const getCrowdnessText = (level: CrowdnessLevel) => {
    switch (level) {
      case 'low': return '널널';
      case 'medium': return '보통';
      case 'high': return '혼잡';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">지도 보기</h2>
      
      {/* Map Container */}
      <Card className="h-96 bg-gradient-to-br from-blue-100 to-green-100">
        <CardContent className="p-6 h-full relative">
          <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto" />
              <div>
                <p className="text-gray-600 font-medium">지도 기능은 개발 중입니다</p>
                <p className="text-sm text-gray-500">현재는 더미 데이터로 시뮬레이션 중</p>
              </div>
            </div>
          </div>
          
          {/* Simulated map markers */}
          <div className="absolute inset-0 p-6">
            {userLocation && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-blue-500 rounded-full p-2 shadow-lg border-4 border-white">
                  <Navigation className="w-4 h-4 text-white" />
                </div>
                <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <Badge variant="secondary" className="text-xs">현재 위치</Badge>
                </div>
              </div>
            )}
            
            {/* Store markers simulation */}
            {stores.slice(0, 4).map((store, index) => {
              const positions = [
                { top: '30%', left: '40%' },
                { top: '60%', left: '30%' },
                { top: '40%', left: '70%' },
                { top: '70%', left: '60%' }
              ];
              
              return (
                <div 
                  key={store.id}
                  className="absolute"
                  style={positions[index]}
                >
                  <div 
                    className={`w-4 h-4 rounded-full border-2 shadow-lg cursor-pointer hover:scale-110 transition-transform ${getCrowdnessColor(store.crowdnessLevel)}`}
                    onClick={() => onStoreClick(store)}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Store Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map((store) => (
          <Card key={store.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onStoreClick(store)}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{store.name}</CardTitle>
                <Badge variant="outline" className="text-xs">{store.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{store.distance}m</span>
                  <div className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getCrowdnessColor(store.crowdnessLevel)}`}>
                    {getCrowdnessText(store.crowdnessLevel)}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStoreSelect(store);
                  }}
                >
                  제보하기
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StoreMap;
